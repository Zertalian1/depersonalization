package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.algoritms.DepersonalizationAlgorithms;
import com.big_case_club.depersonalization.dto.DepersonalizeDataDTO;
import com.big_case_club.depersonalization.mapper.PersonalizeDataMapper;
import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.repository.depersonalize.DepersonalizeDataRepository;
import com.big_case_club.depersonalization.repository.personalize.PersonalizeDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;

@Service
public class Depersonalizator {

    @Autowired
    private DepersonalizeDataRepository depersonalizeDataRepository;

    @Autowired
    private PersonalizeDataRepository personalizeDataRepository;

    @Autowired
    private DepersonalizationAlgorithms depersonalizationAlgorithms;

    @Autowired
    private PersonalizeDataMapper personalizeDataMapper;

    public Boolean depersonalize(DepersonalizeDataDTO dataDto) {
        List<PersonalizeData> personalizeDataList = personalizeDataRepository.findAll();
        personalizeDataList = depersonalizeEachFiled(dataDto,personalizeDataList);
        if(personalizeDataList == null) {
            return false;
        }
        List<DepersonalizeData> depersonalizeDataList = personalizeDataMapper.toDepersonalizeDataList(personalizeDataList);
        depersonalizeDataRepository.deleteAll();
        depersonalizeDataRepository.saveAll(depersonalizeDataList);
        return true;
    }

    private List<PersonalizeData> depersonalizeEachFiled(DepersonalizeDataDTO dataDto,List<PersonalizeData> listData ){
        Field[] fields = dataDto.getClass().getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true); // установка доступности поля
            try {
                // получение значения поля
                boolean value = (boolean) field.get(dataDto);
                if (value) {
                    // получение имени поля
                    String fieldName = field.getName();
                    // получение метода depersonalize для соответствующего поля
                    Method depersonalizeMethod = depersonalizationAlgorithms.getClass().getMethod("depersonalize" + fieldName, PersonalizeData.class);
                    // вызов метода depersonalize для каждого обекта в листе
                    for (PersonalizeData data: listData) {
                        depersonalizeMethod.invoke(depersonalizationAlgorithms, data);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }
        return listData;
    }
}
