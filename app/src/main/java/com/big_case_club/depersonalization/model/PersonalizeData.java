package com.big_case_club.depersonalization.model;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Entity
public class PersonalizeData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    private String placeOfBirth;

    @Column(nullable = false)
    private String gender;

    private String inn;

    @Column(nullable = false)
    private String snils;

    private String contactInfo;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String documentType;

    @Column(nullable = false)
    private String documentNumber;
}
