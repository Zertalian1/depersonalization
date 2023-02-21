package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.model.Data;
import com.big_case_club.depersonalization.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatabaseViewService {

    @Autowired
    private DataRepository dataRepository;

    public List<Data> viewDatabase() {
        return dataRepository.findAll();
    }
}
