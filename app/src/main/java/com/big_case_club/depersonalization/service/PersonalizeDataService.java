package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.repository.personalize.PersonalizeDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PersonalizeDataService {

    @Autowired
    private PersonalizeDataRepository personalizeDataRepository;


    public int getTotalPages() {
        return personalizeDataRepository.findAll(Pageable.ofSize(5)).getTotalPages();
    }

    public List<PersonalizeData> searchDatabase(Map<String, String> searchData, Sort sort, int pageIndex) {
        ExampleMatcher matcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreCase();
        PersonalizeData pdata = new PersonalizeData();
        for(Map.Entry<String, String> entry: searchData.entrySet()) {
            String fieldName = entry.getKey();
            String data = entry.getValue();
            if(data == null) continue;
            if(fieldName.equals("Id")) {
                pdata.setId(Long.valueOf(data));
            }
            else {
                try {
                    new PropertyDescriptor(fieldName,pdata.getClass()).getWriteMethod().invoke(pdata, data);
                } catch (Exception e) {
                    return new ArrayList<PersonalizeData>();
                }
            }
        }
        Example<PersonalizeData> example = Example.of(pdata, matcher);
        return personalizeDataRepository.findAll(example, PageRequest.of(pageIndex, 5, sort)).getContent();
    }
    public List<PersonalizeData> viewDatabase(Sort sort) {

        return viewDatabase(sort, 0);
    }

    public List<PersonalizeData> viewDatabase() {

        return personalizeDataRepository.findAll(Sort.unsorted());
    }

    public List<PersonalizeData> viewDatabase(Sort sort, int pageIndex) {
        return personalizeDataRepository.findAll(PageRequest.of(pageIndex,5,sort)).getContent();
    }

    public PersonalizeData findDataById(Long id) {
        Optional<PersonalizeData> optionalData = personalizeDataRepository.findById(id);
        return optionalData.orElse(null);
    }

    public PersonalizeData saveData(PersonalizeData personalizeData) {
        return personalizeDataRepository.save(personalizeData);
    }

    public PersonalizeData updateData(PersonalizeData updatedPersonalizeData, Long id) {
        PersonalizeData existingPersonalizeData = personalizeDataRepository.findById(id).orElse(null);
        if (existingPersonalizeData != null && updatedPersonalizeData.getId().equals(id)) {
            return personalizeDataRepository.save(updatedPersonalizeData);
        }
        return null;
    }

    public void deleteAllData(){
        personalizeDataRepository.deleteAll();
    }

    public void deleteDataById(Long id) {
        personalizeDataRepository.deleteById(id);
    }
}
