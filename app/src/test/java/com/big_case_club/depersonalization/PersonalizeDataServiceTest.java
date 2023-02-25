package com.big_case_club.depersonalization;

import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.repository.personalize.PersonalizeDataRepository;
import com.big_case_club.depersonalization.service.PersonalizeDataService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertThrows;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(transactionManager = "personalizeTransactionManager")
public class PersonalizeDataServiceTest {

    @Autowired
    private PersonalizeDataService personalizeDataService;

    @Autowired
    private PersonalizeDataRepository personalizeDataRepository;

    @Test
    public void testSaveAndViewDatabase() {
        // Создаем несколько объектов Data и сохраняем их в базе данных
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setFullName("Иванов Иван Иванович");
        personalizeData1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        personalizeData1.setPlaceOfBirth("Москва");
        personalizeData1.setGender("мужской");
        personalizeData1.setInn("123456789012");
        personalizeData1.setSnils("123-456-789 00");
        personalizeData1.setContactInfo("ivanov@example.com");
        personalizeData1.setAddress("Москва, ул. Пушкина, д. 1");
        personalizeData1.setDocumentType("паспорт");
        personalizeData1.setDocumentNumber("1234 567890");

        PersonalizeData personalizeData2 = new PersonalizeData();
        personalizeData2.setFullName("Петров Петр Петрович");
        personalizeData2.setDateOfBirth(LocalDate.of(1980, 2, 2));
        personalizeData2.setPlaceOfBirth("Санкт-Петербург");
        personalizeData2.setGender("мужской");
        personalizeData2.setInn("123456789012");
        personalizeData2.setSnils("123-456-789 00");
        personalizeData2.setContactInfo("petrov@example.com");
        personalizeData2.setAddress("Санкт-Петербург, ул. Лермонтова, д. 2");
        personalizeData2.setDocumentType("паспорт");
        personalizeData2.setDocumentNumber("1234 567890");

        personalizeDataRepository.saveAll(Arrays.asList(personalizeData1, personalizeData2));

        // Вызываем метод viewDatabase() и проверяем, что он возвращает список ожидаемых объектов Data
        List<PersonalizeData> expected = Arrays.asList(personalizeData1, personalizeData2);
        List<PersonalizeData> actual = personalizeDataService.viewDatabase();
        assertThat(actual, containsInAnyOrder(expected.toArray()));
    }

    @Test
    public void testFindByIdAndUpdateData() {
        // Создаем тестовые данные
        PersonalizeData personalizeData = new PersonalizeData();
        personalizeData.setFullName("John Smith");
        personalizeData.setDateOfBirth(LocalDate.of(1980, 1, 1));
        personalizeData.setPlaceOfBirth("New York");
        personalizeData.setGender("Male");
        personalizeData.setInn("123456789012");
        personalizeData.setSnils("123-456-789 00");
        personalizeData.setContactInfo("john.smith@gmail.com");
        personalizeData.setAddress("123 Main St.");
        personalizeData.setDocumentType("Passport");
        personalizeData.setDocumentNumber("123456789");

        // Сохраняем данные в базу
        PersonalizeData savedPersonalizeData = personalizeDataRepository.save(personalizeData);

        // Обновляем данные
        savedPersonalizeData.setFullName("Jane Doe");
        personalizeDataService.updateData(savedPersonalizeData, savedPersonalizeData.getId());

        // Проверяем, что данные были обновлены
        Optional<PersonalizeData> updatedDataOptional = personalizeDataRepository.findById(savedPersonalizeData.getId());
        assertTrue(updatedDataOptional.isPresent());
        assertEquals("Jane Doe", updatedDataOptional.get().getFullName());
    }
}
