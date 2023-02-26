package com.big_case_club.depersonalization.mapper;

import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PersonalizeDataMapper {

    public DepersonalizeData toDepersonalizeData(PersonalizeData personalizeData){
        return new DepersonalizeData(personalizeData.getId(),
                personalizeData.getFullName(),
                personalizeData.getDateOfBirth(),
                personalizeData.getPlaceOfBirth(),
                personalizeData.getGender(),
                personalizeData.getInn(),
                personalizeData.getSnils(),
                personalizeData.getContactInfo(),
                personalizeData.getAddress(),
                personalizeData.getDocumentType(),
                personalizeData.getDocumentNumber());
    }

    public List<DepersonalizeData> toDepersonalizeDataList(List<PersonalizeData> personalizeDataList){
        List<DepersonalizeData> out = new ArrayList<>();
        for (PersonalizeData data: personalizeDataList) {
            out.add(toDepersonalizeData(data));
        }
        return out;
    }
}
