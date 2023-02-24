package com.big_case_club.depersonalization.algoritms;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.springframework.stereotype.Component;

@Component
public class DepersonalizationAlgoritms {
    public void depersonalizeFullName(PersonalizeData data) {
        data.setFullName("DEPERSONALIZED_NAME");
    }
    public void depersonalizesnils(PersonalizeData data) {
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
