package com.big_case_club.depersonalization.controller;

import com.big_case_club.depersonalization.dto.DepersonalizeDataDTO;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.service.Depersonalizator;
import com.big_case_club.depersonalization.service.PersonalizeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/database/personalize")
public class PersonalizeDataController {

    private final PersonalizeDataService personalizeDataService;

    private final Depersonalizator depersonalizator;

    @Autowired
    public PersonalizeDataController(PersonalizeDataService personalizeDataService,Depersonalizator depersonalizator) {
        this.personalizeDataService = personalizeDataService;
        this.depersonalizator = depersonalizator;
    }

    @GetMapping("/view")
    public @ResponseBody
    List<PersonalizeData> viewDatabase() {
        return personalizeDataService.viewDatabase();
    }

    @PostMapping("/save")
    public @ResponseBody
    PersonalizeData createData(@RequestBody PersonalizeData personalizeData) {
        return personalizeDataService.saveData(personalizeData);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonalizeData> getDataById(@PathVariable Long id) {
        PersonalizeData foundPersonalizeData = personalizeDataService.findDataById(id);
        if(foundPersonalizeData != null){
            return ResponseEntity.ok(foundPersonalizeData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonalizeData> updateData(@PathVariable Long id, @RequestBody PersonalizeData personalizeData) {
        PersonalizeData updatedPersonalizeData = personalizeDataService.updateData(personalizeData,id);
        if(updatedPersonalizeData != null){
            return ResponseEntity.ok(updatedPersonalizeData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteData(@PathVariable Long id) {
        personalizeDataService.deleteDataById(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/depersonalize")
    public ResponseEntity<String> depersonalizeData(@RequestBody DepersonalizeDataDTO dto) {
        Boolean result = depersonalizator.depersonalize(dto);
        if(result != null){
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}

