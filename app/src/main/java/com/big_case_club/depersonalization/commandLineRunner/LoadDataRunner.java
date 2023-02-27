package com.big_case_club.depersonalization.commandLineRunner;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.service.PersonalizeDataService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@AllArgsConstructor
public class LoadDataRunner {

    private final PersonalizeDataService personalizeDataService;

    @Bean
    public CommandLineRunner loadData() {
        return (args) -> {
            personalizeDataService.deleteAllData();
            personalizeDataService.saveData(new PersonalizeData(
                    0L,
                    "John Smith",
                    LocalDate.of(1980, 1, 1),
                    "New York",
                    "м",
                    "123456789012",
                    "123-456-789 00",
                    "john.smith@gmail.com",
                    "123 Main St.",
                    "Passport",
                    "123456789"));
            personalizeDataService.saveData(new PersonalizeData(
                    0L,
                    "Петров Петр Петрович",
                    LocalDate.of(1980, 4, 26),
                    "Санкт-Петербург",
                    "м",
                    "123456789012",
                    "123-456-789 00",
                    "petrov@example.com",
                    "Санкт-Петербург, ул. Лермонтова, д. 2",
                    "паспорт",
                    "123456789"));
        };
    }
}

