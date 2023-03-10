package com.big_case_club.depersonalization.controller;

import com.big_case_club.depersonalization.dto.DepersonalizeDataDTO;
import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.service.Depersonalizator;
import com.big_case_club.depersonalization.service.PersonalizeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @RequestMapping(value="view", method = RequestMethod.GET)
    public @ResponseBody
    List<PersonalizeData> viewDatabase(@RequestParam("sorted") String sorted, @RequestParam("page") int page, @RequestParam("direction") String direction) {
        Sort.Direction dir=Sort.Direction.ASC;
        if(direction.equals("DESC")) dir= Sort.Direction.DESC;
        return personalizeDataService.viewDatabase(Sort.by(dir, sorted), page);
    }

    @RequestMapping(value="search", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> viewDatabase(@RequestBody Map<String, String> searchData,
                                     @RequestParam("sorted") String sorted, @RequestParam("page") int page, @RequestParam("direction") String direction) {
        Sort.Direction dir=Sort.Direction.ASC;
        if(direction.equals("DESC")) dir= Sort.Direction.DESC;

        Map<String, Object> res= new HashMap<>();
        Page<PersonalizeData> data = personalizeDataService.searchDatabase(searchData, Sort.by(dir, sorted), page);
        res.put("table", data.getContent());
        res.put("pages", data.getTotalPages());
        return res;
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

