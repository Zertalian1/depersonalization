package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.repository.depersonalize.DepersonalizeDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepersonalizeDataService {

    @Autowired
    private DepersonalizeDataRepository depersonalizeDataRepository;

    public List<DepersonalizeData> viewDatabase() {
        return (List<DepersonalizeData>) depersonalizeDataRepository.findAll();
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

    public void deleteDataById(Long id) {
        depersonalizeDataRepository.deleteById(id);
    }
}
