package com.big_case_club.depersonalization.algoritms;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;

@Component
public class DepersonalizationAlgoritms {
    private final String[] citiesDictionary;
    private final String[] streetDictionary;

    private final ArrayList<String[]> firstNamesDictionary;
    private final ArrayList<String[]> secondNameDictionary;
    public DepersonalizationAlgoritms() {
        citiesDictionary = new String[] {"Абакан", "Александров", "Алексин", "Альметьевск", "Анапа", "Ангарск", "Анжеро-Судженск", "Апатиты", "Арзамас", "Армавир", "Арсеньев", "Артем", "Архангельск", "Асбест", "Астрахань", "Ачинск", "Балаково", "Балахна", "Балашиха", "Балашов", "Барнаул", "Батайск", "Белгород", "Белебей", "Белово", "Белогорск (Амурская область)", "Белорецк", "Белореченск", "Бердск", "Березники", "Березовский (Свердловская область)", "Бийск", "Биробиджан", "Благовещенск (Амурская область)", "Бор", "Борисоглебск", "Боровичи", "Братск", "Брянск", "Бугульма", "Буденновск", "Бузулук", "Буйнакск", "Великие Луки", "Великий Новгород", "Верхняя Пышма", "Видное", "Владивосток", "Владикавказ", "Владимир", "Волгоград", "Волгодонск", "Волжск", "Волжский", "Вологда", "Вольск", "Воркута", "Воронеж", "Воскресенск", "Воткинск", "Всеволожск", "Выборг", "Выкса", "Вязьма", "Гатчина", "Геленджик", "Георгиевск", "Глазов", "Горно-Алтайск", "Грозный", "Губкин", "Гудермес", "Гуково", "Гусь-Хрустальный", "Дербент", "Дзержинск", "Димитровград", "Дмитров", "Долгопрудный", "Домодедово", "Донской", "Дубна", "Евпатория", "Егорьевск", "Ейск", "Екатеринбург", "Елабуга", "Елец", "Ессентуки", "Железногорск (Красноярский край)", "Железногорск (Курская область)", "Жигулевск", "Жуковский", "Заречный", "Зеленогорск", "Зеленодольск", "Златоуст", "Иваново", "Ивантеевка", "Ижевск", "Избербаш", "Иркутск", "Искитим", "Ишим", "Ишимбай", "Йошкар-Ола", "Казань", "Калининград", "Калуга", "Каменск-Уральский", "Каменск-Шахтинский", "Камышин", "Канск", "Каспийск", "Кемерово", "Керчь", "Кинешма", "Кириши", "Киров (Кировская область)", "Кирово-Чепецк", "Киселевск", "Кисловодск", "Клин", "Клинцы", "Ковров", "Когалым", "Коломна", "Комсомольск-на-Амуре", "Копейск", "Королев", "Кострома", "Котлас", "Красногорск", "Краснодар", "Краснокаменск", "Краснокамск", "Краснотурьинск", "Красноярск", "Кропоткин", "Крымск", "Кстово", "Кузнецк", "Кумертау", "Кунгур", "Курган", "Курск", "Кызыл", "Лабинск", "Лениногорск", "Ленинск-Кузнецкий", "Лесосибирск", "Липецк", "Лиски", "Лобня", "Лысьва", "Лыткарино", "Люберцы", "Магадан", "Магнитогорск", "Майкоп", "Махачкала", "Междуреченск", "Мелеуз", "Миасс", "Минеральные Воды", "Минусинск", "Михайловка", "Михайловск (Ставропольский край)", "Мичуринск", "Москва", "Мурманск", "Муром", "Мытищи", "Набережные Челны", "Назарово", "Назрань", "Нальчик", "Наро-Фоминск", "Находка", "Невинномысск", "Нерюнгри", "Нефтекамск", "Нефтеюганск", "Нижневартовск", "Нижнекамск", "Нижний Новгород", "Нижний Тагил", "Новоалтайск", "Новокузнецк", "Новокуйбышевск", "Новомосковск", "Новороссийск", "Новосибирск", "Новотроицк", "Новоуральск", "Новочебоксарск", "Новочеркасск", "Новошахтинск", "Новый Уренгой", "Ногинск", "Норильск", "Ноябрьск", "Нягань", "Обнинск", "Одинцово", "Озерск (Челябинская область)", "Октябрьский", "Омск", "Орел", "Оренбург", "Орехово-Зуево", "Орск", "Павлово", "Павловский Посад", "Пенза", "Первоуральск", "Пермь", "Петрозаводск", "Петропавловск-Камчатский", "Подольск", "Полевской", "Прокопьевск", "Прохладный", "Псков", "Пушкино", "Пятигорск", "Раменское", "Ревда", "Реутов", "Ржев", "Рославль", "Россошь", "Ростов-на-Дону", "Рубцовск", "Рыбинск", "Рязань", "Салават", "Сальск", "Самара", "Санкт-Петербург", "Саранск", "Сарапул", "Саратов", "Саров", "Свободный", "Севастополь", "Северодвинск", "Северск", "Сергиев Посад", "Серов", "Серпухов", "Сертолово", "Сибай", "Симферополь", "Славянск-на-Кубани", "Смоленск", "Соликамск", "Солнечногорск", "Сосновый Бор", "Сочи", "Ставрополь", "Старый Оскол", "Стерлитамак", "Ступино", "Сургут", "Сызрань", "Сыктывкар", "Таганрог", "Тамбов", "Тверь", "Тимашевск", "Тихвин", "Тихорецк", "Тобольск", "Тольятти", "Томск", "Троицк", "Туапсе", "Туймазы", "Тула", "Тюмень", "Узловая", "Улан-Удэ", "Ульяновск", "Урус-Мартан", "Усолье-Сибирское", "Уссурийск", "Усть-Илимск", "Уфа", "Ухта", "Феодосия", "Фрязино", "Хабаровск", "Ханты-Мансийск", "Хасавюрт", "Химки", "Чайковский", "Чапаевск", "Чебоксары", "Челябинск", "Черемхово", "Череповец", "Черкесск", "Черногорск", "Чехов", "Чистополь", "Чита", "Шадринск", "Шали", "Шахты", "Шуя", "Щекино", "Щелково", "Электросталь", "Элиста", "Энгельс", "Южно-Сахалинск", "Юрга", "Якутск", "Ялта", "Ярославль"};
        secondNameDictionary=new ArrayList<>();
        secondNameDictionary.add(new String[] {"Князев","Смирнов","Юдин","Попов","Васильев","Демин","Кузин","Родионов","Фёдоров","Морозов","Долгов","Алексеев","Лебедев","Семёнов","Егоров","Федотов","Злобин","Сомов","Москвин","Гущин"});
        secondNameDictionary.add(new String[] {"Князева","Смирнова","Юдина","Попова","Васильева","Деминова","Кузинова","Родионова","Фёдорова","Морозова","Долгова","Алексеевна","Лебедевна","Семёнова","Егоровна","Федотовна","Злобина","Сомова","Москвинова","Гущина"});
        firstNamesDictionary=new ArrayList<>();
        firstNamesDictionary.add(new String[] {"Александр","Иван","Лев","Игорь","Вася","Михаил","Дмитрий","Матвей","Генадий","Даниил","Игнат","Евгений",});
        firstNamesDictionary.add(new String[] {"Полина", "Света","Мария","Анна","Ева","Виктория","Александра","Анастасия"});
        streetDictionary = new String[] {"Косиора", "Ладыгина", "Ленина", "Ломоносова", "Домодедовская", "Гоголя", "1905 года", "Чехова", "Сталина", "Космонавтов", "Гагарина", "Славы", "Бухарестская", "Будапештсткая", "Балканская", "Центральная", "Молодёжная ", "Советская", "Садовая", "Лесная", "Мира", "Набережная"};
    }

    /*public void depersonalizeFullName(PersonalizeData data) {
        data.setFullName("DEPERSONALIZED_NAME");
    }*/

    public void depersonalizeInn(PersonalizeData data) {
        String oldInn = data.getInn();
        int hash = oldInn.hashCode();
        StringBuilder newInn = new StringBuilder();
        for(int i=0; i<oldInn.length(); ++i) {
            char innChar = oldInn.charAt(i);
            if(innChar>='0' && innChar<='9') {
                int number = innChar-'0';
                number=(number+Math.abs(hash))%10;
                hash=String.valueOf(hash).hashCode();
                innChar = (char)(number+'0');
            }
            newInn.append(innChar);
        }
        data.setInn(newInn.toString());
    }

    public void  depersonalizeDateOfBirth(PersonalizeData data){
        LocalDate date = data.getDateOfBirth();
        int hash = Math.abs(data.hashCode());
        data.setDateOfBirth(date.withMonth(1+hash%12).withDayOfMonth(1+hash%28));
    }

    public void  depersonalizeFullName(PersonalizeData data){
        String[] fullName = data.getFullName().split(" ");
        int hash0 = Math.abs(fullName[0].hashCode());
        int hash1 = Math.abs(fullName[1].hashCode());
        String gender = data.getGender().toLowerCase();
        int genderIndex=0;
        if(gender.equals("ж")) {
            genderIndex=1;
        }
        String[] firstNameArray = firstNamesDictionary.get(genderIndex);
        String[] secondNameArray = secondNameDictionary.get(genderIndex);
        String firstName = firstNameArray[hash0%firstNameArray.length];
        String secondName = secondNameArray[hash1%secondNameArray.length];
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

    public void depersonalizeContactInfo(PersonalizeData data) {
        String oldContact = data.getContactInfo();
        int hash = oldContact.hashCode();
        String alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder newContact = new StringBuilder();
        for(int i=0; i<oldContact.length(); ++i) {
            char contactChar = oldContact.charAt(i);
            if(contactChar!='.' && contactChar!='@') {
                int temp = contactChar;
                temp+=Math.abs(hash);
                hash=String.valueOf(hash).hashCode();
                contactChar=alphabet.charAt(temp%alphabet.length());
            }
            newContact.append(contactChar);
        }
        data.setContactInfo(newContact.toString());
    }

    public void depersonalizePaceOfBirth(PersonalizeData data) {
        int hash = data.getPlaceOfBirth().hashCode();
        data.setPlaceOfBirth(citiesDictionary[hash%citiesDictionary.length]);
    }

    public void depersonalizeDocumentNumber(PersonalizeData data) {
        String oldDocument = data.getDocumentNumber();
        int hash = oldDocument.hashCode();
        StringBuilder newDocument = new StringBuilder();
        for(int i=0; i<oldDocument.length(); ++i) {
            char documentChar = oldDocument.charAt(i);
            if(documentChar>='0' && documentChar<='9') {
                int numberInt = documentChar-'0';
                numberInt=(numberInt+Math.abs(hash))%10;
                hash = String.valueOf(hash).hashCode();
                documentChar = (char)(numberInt+'0');
            }
            newDocument.append(documentChar);
        }
        data.setDocumentNumber(newDocument.toString());
    }

    public void depersonalizeAddress(PersonalizeData data) {
        int hash = data.getAddress().hashCode();
        StringBuilder address = new StringBuilder();
        address.append(citiesDictionary[Math.abs(hash)%citiesDictionary.length]);
        hash = String.valueOf(hash).hashCode();
        address.append(", ул. ").append(streetDictionary[Math.abs(hash) % streetDictionary.length]);
        hash = String.valueOf(hash).hashCode();
        address.append(", д. ").append(1+Math.abs(hash) % 69);
        data.setAddress(address.toString());
    }

}
