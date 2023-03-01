package com.big_case_club.depersonalization.controller;


import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/database/personalize")
public class AuthenticationController {
    @GetMapping("/hasAccess")
    public Boolean access() {
        return true;
    }
}
