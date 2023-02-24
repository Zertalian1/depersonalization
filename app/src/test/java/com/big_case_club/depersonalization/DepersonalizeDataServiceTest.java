package com.big_case_club.depersonalization;

import com.big_case_club.depersonalization.modelDepersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.repositoryDepersonalize.DepersonalizeDataRepository;
import com.big_case_club.depersonalization.service.DepersonalizeDataService;
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
@Transactional(transactionManager = "depersonalizeTransactionManager")
public class DepersonalizeDataServiceTest {

    @Autowired
    private DepersonalizeDataService depersonalizeDataService;

    @Autowired
    private DepersonalizeDataRepository depersonalizeDataRepository;

    @Test
    public void testSaveAndViewDatabase() {
        // Создаем несколько объектов Data и сохраняем их в базе данных
        DepersonalizeData depersonalizeData1 = new DepersonalizeData();
        depersonalizeData1.setFullName("Иванов Иван Иванович");
        depersonalizeData1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        depersonalizeData1.setPlaceOfBirth("Москва");
        depersonalizeData1.setGender("мужской");
        depersonalizeData1.setInn("123456789012");
        depersonalizeData1.setSnils("123-456-789 00");
        depersonalizeData1.setContactInfo("ivanov@example.com");
        depersonalizeData1.setAddress("Москва, ул. Пушкина, д. 1");
        depersonalizeData1.setDocumentType("паспорт");
        depersonalizeData1.setDocumentNumber("1234 567890");

        DepersonalizeData depersonalizeData2 = new DepersonalizeData();
        depersonalizeData2.setFullName("Петров Петр Петрович");
        depersonalizeData2.setDateOfBirth(LocalDate.of(1980, 2, 2));
        depersonalizeData2.setPlaceOfBirth("Санкт-Петербург");
        depersonalizeData2.setGender("мужской");
        depersonalizeData2.setInn("123456789012");
        depersonalizeData2.setSnils("123-456-789 00");
        depersonalizeData2.setContactInfo("petrov@example.com");
        depersonalizeData2.setAddress("Санкт-Петербург, ул. Лермонтова, д. 2");
        depersonalizeData2.setDocumentType("паспорт");
        depersonalizeData2.setDocumentNumber("1234 567890");

        depersonalizeDataRepository.saveAll(Arrays.asList(depersonalizeData1, depersonalizeData2));

        // Вызываем метод viewDatabase() и проверяем, что он возвращает список ожидаемых объектов Data
        List<DepersonalizeData> expected = Arrays.asList(depersonalizeData1, depersonalizeData2);
        List<DepersonalizeData> actual = depersonalizeDataService.viewDatabase();
        assertThat(actual, containsInAnyOrder(expected.toArray()));
    }

    @Test
    public void testFindByIdAndUpdateData() {
        // Создаем тестовые данные
        DepersonalizeData depersonalizeData = new DepersonalizeData();
        depersonalizeData.setFullName("John Smith");
        depersonalizeData.setDateOfBirth(LocalDate.of(1980, 1, 1));
        depersonalizeData.setPlaceOfBirth("New York");
        depersonalizeData.setGender("Male");
        depersonalizeData.setInn("123456789012");
        depersonalizeData.setSnils("123-456-789 00");
        depersonalizeData.setContactInfo("john.smith@gmail.com");
        depersonalizeData.setAddress("123 Main St.");
        depersonalizeData.setDocumentType("Passport");
        depersonalizeData.setDocumentNumber("123456789");

        // Сохраняем данные в базу
        DepersonalizeData savedDepersonalizeData = depersonalizeDataRepository.save(depersonalizeData);

        // Обновляем данные
        savedDepersonalizeData.setFullName("Jane Doe");
        depersonalizeDataService.updateData(savedDepersonalizeData, savedDepersonalizeData.getId());

        // Проверяем, что данные были обновлены
        Optional<DepersonalizeData> updatedDataOptional = depersonalizeDataRepository.findById(savedDepersonalizeData.getId());
        assertTrue(updatedDataOptional.isPresent());
        assertEquals("Jane Doe", updatedDataOptional.get().getFullName());
    }
}