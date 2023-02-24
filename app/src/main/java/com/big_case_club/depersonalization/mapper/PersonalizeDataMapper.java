package com.big_case_club.depersonalization.mapper;

import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface PersonalizeDataMapper {

    PersonalizeDataMapper INSTANCE = Mappers.getMapper(PersonalizeDataMapper.class);

    DepersonalizeData toDepersonalizeData(PersonalizeData personalizeData);

    List<DepersonalizeData> toDepersonalizeDataList(List<PersonalizeData> personalizeDataList);
}
