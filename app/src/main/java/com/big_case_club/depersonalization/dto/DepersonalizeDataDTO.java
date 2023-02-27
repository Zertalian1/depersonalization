package com.big_case_club.depersonalization.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DepersonalizeDataDTO {
    private boolean fullName;
    private boolean dateOfBirth;
    private boolean placeOfBirth;
    private boolean inn;
    private boolean snils;
    private boolean contactInfo;
    private boolean address;
    private boolean documentNumber;
}
