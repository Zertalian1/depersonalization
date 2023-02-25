package com.big_case_club.depersonalization.algoritms;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.HashMap;

@Component
public class DepersonalizationAlgoritms {


    private static final HashMap<Integer, String> firstNamesDictionary = new HashMap<>();
    private static final HashMap<Integer, String> secondNameDictionary = new HashMap<>();
    static {
        secondNameDictionary.put(1, "Князев");
        secondNameDictionary.put(2, "Смирнов");
        secondNameDictionary.put(3, "Юдин");
        secondNameDictionary.put(4, "Попов");
        secondNameDictionary.put(5, "Васильев");
        secondNameDictionary.put(6, "Демин");
        secondNameDictionary.put(7, "Кузин");
        secondNameDictionary.put(8, "Родионов");
        secondNameDictionary.put(9, "Фёдоров");
        secondNameDictionary.put(10, "Морозов");
        secondNameDictionary.put(11, "Долгов");
        secondNameDictionary.put(12, "Алексеев");
        secondNameDictionary.put(13, "Лебедев");
        secondNameDictionary.put(14, "Семёнов");
        secondNameDictionary.put(15, "Егоров");
        secondNameDictionary.put(16, "Федотов");
        secondNameDictionary.put(17, "Злобин");
        secondNameDictionary.put(18, "Сомов");
        secondNameDictionary.put(19, "Москвин");
        secondNameDictionary.put(20, "Гущин");
    }
    static {
        firstNamesDictionary.put(1, "Александр");
        firstNamesDictionary.put(2, "Иван");
        firstNamesDictionary.put(3, "Лев");
        firstNamesDictionary.put(4, "Игорь");
        firstNamesDictionary.put(5, "Вася");
        firstNamesDictionary.put(6, "Михаил");
        firstNamesDictionary.put(7, "Дмитрий");
        firstNamesDictionary.put(8, "Полина");
        firstNamesDictionary.put(9, "Матвей");
        firstNamesDictionary.put(10, "Света");
        firstNamesDictionary.put(11, "Генадий");
        firstNamesDictionary.put(12, "Даниил");
        firstNamesDictionary.put(13, "Мария");
        firstNamesDictionary.put(14, "Игнат");
        firstNamesDictionary.put(15, "Евгений");
        firstNamesDictionary.put(16, "Анна");
        firstNamesDictionary.put(17, "Ева");
        firstNamesDictionary.put(18, "Виктория");
        firstNamesDictionary.put(19, "Александра");
        firstNamesDictionary.put(20, "Анастасия");
    }

    /*public void depersonalizeFullName(PersonalizeData data) {
        data.setFullName("DEPERSONALIZED_NAME");
    }*/

    public static void depersonalizeInn(PersonalizeData data) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] digest = md.digest(data.getInn().getBytes(StandardCharsets.UTF_8));
        StringBuilder string = new StringBuilder();
        for(byte b: digest){
            string.append(String.format("%02x", b & 0xff));
        }
        data.setInn(string.toString());
    }

    public static void  depersonalizeDateOfBirth(PersonalizeData data){
        LocalDate date = data.getDateOfBirth();
        data.setDateOfBirth(data.getDateOfBirth().withDayOfMonth((date.getDayOfMonth()*date.getDayOfYear()&date.getMonthValue())%28));
    }

    public static void  depersonalizeFullName(PersonalizeData data){
        String[] fullName = data.getFullName().split(" ");
        String firstName = firstNamesDictionary.get(fullName[0].hashCode()%firstNamesDictionary.size());
        String secondName = secondNameDictionary.get(fullName[1].hashCode()%secondNameDictionary.size());
        data.setFullName(firstName+" "+secondName);
    }

    public void depersonalizeSnils(PersonalizeData data) {
        String oldSnils = data.getSnils();
        StringBuilder newSnils = new StringBuilder();
        int hash = Math.abs(oldSnils.hashCode());
        int controlSum=0;
        int index=1;

        for(int i=oldSnils.length()-3; i>=0; --i) {
            char snilsChar = oldSnils.charAt(i);
            if(snilsChar>='0' && snilsChar<='9') {
                int numberInt = snilsChar-'0';
                numberInt=(numberInt+hash)%10;
                hash = Math.abs(String.valueOf(hash).hashCode());
                snilsChar = (char)(numberInt+'0');
                controlSum+=numberInt*index;
                index++;
            }
            newSnils.insert(0, snilsChar);
        }
        controlSum%=101;
        if(controlSum==100) controlSum=0;
        String controlSumString = String.valueOf(controlSum);
        if(controlSumString.length()==1) controlSumString="0"+controlSumString;
        newSnils.append(controlSumString);
        data.setSnils(newSnils.toString());
    }
}
