package com.big_case_club.depersonalization.commandLineRunner;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.service.PersonalizeDataService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@AllArgsConstructor
public class LoadDataRunner {

    private final PersonalizeDataService personalizeDataService;

    @Bean
    public CommandLineRunner loadData() {
        return (args) -> {
            List<PersonalizeData> data = personalizeDataService.viewDatabase("");
            if(data.isEmpty()) {
                personalizeDataService.saveData(new PersonalizeData(
                        0L,
                        "Иванов Иван Иваныч",
                        LocalDate.of(2002, 3, 12),
                        "Новосибирск",
                        "м",
                        "123666789012",
                        "123-666-666 00",
                        "d.pankov@g.nsu.ru",
                        "Советская 19",
                        "пасспорт",
                        "123333789"));
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
            }
        };
    }
}

