package com.big_case_club.depersonalization.controller;

import com.big_case_club.depersonalization.model.Data;
import com.big_case_club.depersonalization.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/database")
public class DatabaseController {

    private final DatabaseService databaseService;

    @Autowired
    public DatabaseController(DatabaseService databaseService) {
        this.databaseService = databaseService;
    }

    @GetMapping("/view")
    public @ResponseBody
    List<Data> viewDatabase() {
        return databaseService.viewDatabase();
    }

    @PostMapping("/save")
    public @ResponseBody
    Data createData(@RequestBody Data data) {
        return databaseService.saveData(data);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Data> getDataById(@PathVariable Long id) {
        Data foundData = databaseService.findDataById(id);
        if(foundData != null){
            return ResponseEntity.ok(foundData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Data> updateData(@PathVariable Long id, @RequestBody Data data) {
        Data updatedData = databaseService.updateData(data,id);
        if(updatedData != null){
            return ResponseEntity.ok(updatedData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteData(@PathVariable Long id) {
        databaseService.deleteDataById(id);
        return ResponseEntity.ok().build();
    }
}

