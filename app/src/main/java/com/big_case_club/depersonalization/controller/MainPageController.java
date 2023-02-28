package com.big_case_club.depersonalization.controller;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/")
public class MainPageController {
    @GetMapping()
    public String viewDatabase() {
        return "hello";
    }
}
