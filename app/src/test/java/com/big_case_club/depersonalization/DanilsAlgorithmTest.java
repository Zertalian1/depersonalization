package com.big_case_club.depersonalization;

import com.big_case_club.depersonalization.algoritms.DepersonalizationAlgoritms;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import lombok.SneakyThrows;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DanilsAlgorithmTest {

    @SneakyThrows
    @Test
    public void testInnDepersonalize() {
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setFullName("Иванов Иван Иванович");
        personalizeData1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        personalizeData1.setPlaceOfBirth("Москва");
        personalizeData1.setGender("мужской");
        personalizeData1.setInn("190-183-123 26");
        personalizeData1.setSnils("123-456-789 00");
        personalizeData1.setContactInfo("ivanov@example.com");
        personalizeData1.setAddress("Москва, ул. Пушкина, д. 1");
        personalizeData1.setDocumentType("паспорт");
        personalizeData1.setDocumentNumber("1234 567890");
        DepersonalizationAlgoritms.depersonalizeInn(personalizeData1);
        assertEquals(personalizeData1.getInn(), "fa2a4917535deec40b26fd648fd81e383c02990f4f40ac669eb9d72d3175ead8");
    }

    @Test
    public void testDateOfBirthDepersonalize() {
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setFullName("Иванов Иван Иванович");
        personalizeData1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        personalizeData1.setPlaceOfBirth("Москва");
        personalizeData1.setGender("мужской");
        personalizeData1.setInn("190-183-123 26");
        personalizeData1.setSnils("123-456-789 00");
        personalizeData1.setContactInfo("ivanov@example.com");
        personalizeData1.setAddress("Москва, ул. Пушкина, д. 1");
        personalizeData1.setDocumentType("паспорт");
        personalizeData1.setDocumentNumber("1234 567890");

        PersonalizeData personalizeData2 = new PersonalizeData();
        personalizeData2.setFullName("Петров Петр Петрович");
        personalizeData2.setDateOfBirth(LocalDate.of(1990, 1, 1));
        personalizeData2.setPlaceOfBirth("Санкт-Петербург");
        personalizeData2.setGender("мужской");
        personalizeData2.setInn("123456789012");
        personalizeData2.setSnils("123-456-789 00");
        personalizeData2.setContactInfo("petrov@example.com");
        personalizeData2.setAddress("Санкт-Петербург, ул. Лермонтова, д. 2");
        personalizeData2.setDocumentType("паспорт");
        personalizeData2.setDocumentNumber("1234 567890");
        DepersonalizationAlgoritms.depersonalizeDateOfBirth(personalizeData1);
        DepersonalizationAlgoritms.depersonalizeDateOfBirth(personalizeData2);
        assertEquals(personalizeData1.getDateOfBirth(), personalizeData2.getDateOfBirth());
    }

    @Test
    public void testFullNameDepersonalize() {
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setFullName("Иванов Иван Иванович");
        personalizeData1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        personalizeData1.setPlaceOfBirth("Москва");
        personalizeData1.setGender("мужской");
        personalizeData1.setInn("190-183-123 26");
        personalizeData1.setSnils("123-456-789 00");
        personalizeData1.setContactInfo("ivanov@example.com");
        personalizeData1.setAddress("Москва, ул. Пушкина, д. 1");
        personalizeData1.setDocumentType("паспорт");
        personalizeData1.setDocumentNumber("1234 567890");

        PersonalizeData personalizeData2 = new PersonalizeData();
        personalizeData2.setFullName("Иванов Иван Иванович");
        personalizeData2.setDateOfBirth(LocalDate.of(1990, 1, 1));
        personalizeData2.setPlaceOfBirth("Санкт-Петербург");
        personalizeData2.setGender("мужской");
        personalizeData2.setInn("123456789012");
        personalizeData2.setSnils("123-456-789 00");
        personalizeData2.setContactInfo("petrov@example.com");
        personalizeData2.setAddress("Санкт-Петербург, ул. Лермонтова, д. 2");
        personalizeData2.setDocumentType("паспорт");
        personalizeData2.setDocumentNumber("1234 567890");

        DepersonalizationAlgoritms.depersonalizeFullName(personalizeData1);
        DepersonalizationAlgoritms.depersonalizeFullName(personalizeData2);

        assertEquals(personalizeData1.getFullName(), personalizeData2.getFullName());
    }

}
