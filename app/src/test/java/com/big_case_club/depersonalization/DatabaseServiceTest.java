package com.big_case_club.depersonalization;

import com.big_case_club.depersonalization.exception.NotFoundException;
import com.big_case_club.depersonalization.model.Data;
import com.big_case_club.depersonalization.repository.DataRepository;
import com.big_case_club.depersonalization.service.DatabaseService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class DatabaseServiceTest {

    @Autowired
    private DatabaseService databaseService;

    @Autowired
    private DataRepository dataRepository;

    @Test
    public void testSaveAndViewDatabase() {
        // Создаем несколько объектов Data и сохраняем их в базе данных
        Data data1 = new Data();
        data1.setFullName("Иванов Иван Иванович");
        data1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        data1.setPlaceOfBirth("Москва");
        data1.setGender("мужской");
        data1.setInn("123456789012");
        data1.setSnils("123-456-789 00");
        data1.setContactInfo("ivanov@example.com");
        data1.setAddress("Москва, ул. Пушкина, д. 1");
        data1.setDocumentType("паспорт");
        data1.setDocumentNumber("1234 567890");

        Data data2 = new Data();
        data2.setFullName("Петров Петр Петрович");
        data2.setDateOfBirth(LocalDate.of(1980, 2, 2));
        data2.setPlaceOfBirth("Санкт-Петербург");
        data2.setGender("мужской");
        data2.setInn("123456789012");
        data2.setSnils("123-456-789 00");
        data2.setContactInfo("petrov@example.com");
        data2.setAddress("Санкт-Петербург, ул. Лермонтова, д. 2");
        data2.setDocumentType("паспорт");
        data2.setDocumentNumber("1234 567890");

        dataRepository.saveAll(Arrays.asList(data1, data2));

        // Вызываем метод viewDatabase() и проверяем, что он возвращает список ожидаемых объектов Data
        List<Data> expected = Arrays.asList(data1, data2);
        List<Data> actual = databaseService.viewDatabase();
        assertThat(actual, containsInAnyOrder(expected.toArray()));
    }

    @Test
    public void testFindByIdAndUpdateData() {
        // Создаем тестовые данные
        Data data = new Data();
        data.setFullName("John Smith");
        data.setDateOfBirth(LocalDate.of(1980, 1, 1));
        data.setPlaceOfBirth("New York");
        data.setGender("Male");
        data.setInn("123456789012");
        data.setSnils("123-456-789 00");
        data.setContactInfo("john.smith@gmail.com");
        data.setAddress("123 Main St.");
        data.setDocumentType("Passport");
        data.setDocumentNumber("123456789");

        // Сохраняем данные в базу
        Data savedData = dataRepository.save(data);

        // Обновляем данные
        savedData.setFullName("Jane Doe");
        databaseService.updateData(savedData, savedData.getId());

        // Проверяем, что данные были обновлены
        Optional<Data> updatedDataOptional = dataRepository.findById(savedData.getId());
        assertTrue(updatedDataOptional.isPresent());
        assertEquals("Jane Doe", updatedDataOptional.get().getFullName());
    }
}