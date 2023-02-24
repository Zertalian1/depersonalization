package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.dto.DepersonalizeDataDTO;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.repository.depersonalize.DepersonalizeDataRepository;
import com.big_case_club.depersonalization.repository.personalize.PersonalizeDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class Depersonalizator {

    @Autowired
    private DepersonalizeDataRepository depersonalizeDataRepository;

    @Autowired
    private PersonalizeDataRepository personalizeDataRepository;

    public Boolean depersonalize(DepersonalizeDataDTO dataDto) {
        List<PersonalizeData> listData = personalizeDataRepository.findAll();
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
                    Method depersonalizeMethod = this.getClass().getMethod("depersonalize" + fieldName, PersonalizeData.class);
                    // вызов метода depersonalize для каждого обекта в листе
                    for (PersonalizeData data: listData) {
                        depersonalizeMethod.invoke(this, data);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
        depersonalizeDataRepository.deleteAll();
        return true;
    }

    // пример метода depersonalize для поля name
    public void depersonalizeFullName(PersonalizeData data) {
        data.setFullName("DEPERSONALIZED_NAME");
    }
}
