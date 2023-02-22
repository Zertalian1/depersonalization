package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.model.Data;
import com.big_case_club.depersonalization.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DatabaseService {

    @Autowired
    private DataRepository dataRepository;

    public List<Data> viewDatabase() {
        return (List<Data>) dataRepository.findAll();
    }

    public Data findDataById(Long id) {
        Optional<Data> optionalData = dataRepository.findById(id);
        return optionalData.orElse(null);
    }

    public Data saveData(Data data) {
        return dataRepository.save(data);
    }

    public Data updateData(Data updatedData, Long id) {
        Data existingData = dataRepository.findById(id).orElse(null);
        if (existingData != null && updatedData.getId().equals(id)) {
            return dataRepository.save(updatedData);
        }
        return null;
    }

    public void deleteDataById(Long id) {
        dataRepository.deleteById(id);
    }
}
