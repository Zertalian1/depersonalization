package com.big_case_club.depersonalization.controller;

import com.big_case_club.depersonalization.model.Data;
import com.big_case_club.depersonalization.service.DatabaseViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/database")
public class DatabaseViewController {

    private final DatabaseViewService databaseService;

    @Autowired
    public DatabaseViewController(DatabaseViewService databaseViewService) {
        this.databaseService = databaseViewService;
    }

    @GetMapping("/view")
    public @ResponseBody List<Data> viewDatabase() {
        return databaseService.viewDatabase();
    }
}
