package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.model.PersonalizeData;
import com.big_case_club.depersonalization.repository.PersonalizeDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalizeDataService {

    @Autowired
    private PersonalizeDataRepository personalizeDataRepository;

    public List<PersonalizeData> viewDatabase() {
        return (List<PersonalizeData>) personalizeDataRepository.findAll();
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

    public void deleteDataById(Long id) {
        personalizeDataRepository.deleteById(id);
    }
}
