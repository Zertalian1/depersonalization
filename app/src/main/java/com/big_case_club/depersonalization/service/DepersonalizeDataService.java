package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.repository.depersonalize.DepersonalizeDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.beans.PropertyDescriptor;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DepersonalizeDataService {

    @Autowired
    private DepersonalizeDataRepository depersonalizeDataRepository;

    public Page<DepersonalizeData> searchDatabase(Map<String, String> searchData, Sort sort, int pageIndex) {
        ExampleMatcher matcher = ExampleMatcher.matching().withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING).withIgnoreCase();
        DepersonalizeData pdata = new DepersonalizeData();

        for(Map.Entry<String, String> entry: searchData.entrySet()) {
            String fieldName = entry.getKey();
            String data = entry.getValue();
            if(data == null) continue;
            if(fieldName.equalsIgnoreCase("id")) {
                pdata.setId(Long.valueOf(data));
            } else if(fieldName.equalsIgnoreCase("dateofbirth")) {
                continue;
            }
            else {
                try {
                    new PropertyDescriptor(fieldName,pdata.getClass()).getWriteMethod().invoke(pdata, data);
                } catch (Exception e) {
                    return null;
                }
            }
        }
        Example<DepersonalizeData> example = Example.of(pdata, matcher);
        return depersonalizeDataRepository.findAll(example, PageRequest.of(pageIndex, 5, sort));
    }
    public List<DepersonalizeData> viewDatabase() {
        return depersonalizeDataRepository.findAll(Sort.unsorted());
    }

    public List<DepersonalizeData> viewDatabase(Sort sort) {
        return viewDatabase(sort, 0);
    }
    public List<DepersonalizeData> viewDatabase(Sort sort, int pageIndex) {
        return depersonalizeDataRepository.findAll(PageRequest.of(pageIndex,5,sort)).getContent();
    }

    public DepersonalizeData findDataById(Long id) {
        Optional<DepersonalizeData> optionalData = depersonalizeDataRepository.findById(id);
        return optionalData.orElse(null);
    }

    public DepersonalizeData saveData(DepersonalizeData depersonalizeData) {
        return depersonalizeDataRepository.save(depersonalizeData);
    }

    public DepersonalizeData updateData(DepersonalizeData updatedDepersonalizeData, Long id) {
        DepersonalizeData existingDepersonalizeData = depersonalizeDataRepository.findById(id).orElse(null);
        if (existingDepersonalizeData != null && updatedDepersonalizeData.getId().equals(id)) {
            return depersonalizeDataRepository.save(updatedDepersonalizeData);
        }
        return null;
    }

    public void deleteAllData(){
        depersonalizeDataRepository.deleteAll();
    }

    public void deleteDataById(Long id) {
        depersonalizeDataRepository.deleteById(id);
    }
}
