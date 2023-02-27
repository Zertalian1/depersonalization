package com.big_case_club.depersonalization;

import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.service.DepersonalizeDataService;
import com.big_case_club.depersonalization.service.FileService;
import com.big_case_club.depersonalization.service.PersonalizeDataService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.junit.Assert.*;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(transactionManager = "personalizeTransactionManager")
public class FileServiceTest {

    @Autowired
    private FileService fileService;

    @Autowired
    private PersonalizeDataService personalizeDataService;



    @Autowired
    private DepersonalizeDataService depersonalizeDataService;

    @Test
    public void uploadFileTest() {
        String name = "inputTestFile.xlsx";
        String originalFileName = "inputTestFile.xlsx";
        String contentType = "text/plain";
        byte[] content = null;
        try {
            content = Files.readAllBytes(Paths.get("src/test/java/com/big_case_club/depersonalization/inputTestFile.xlsx"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        fileService.createDatabase(new MockMultipartFile(name, originalFileName, contentType, content));
        List<PersonalizeData> data = personalizeDataService.viewDatabase(null);
        assertEquals(data.size(), 4);
        System.out.println(data);
    }

    @Test
    public void downloadFileTest() throws IOException {
        DepersonalizeData personalizeData1 = new DepersonalizeData();
        personalizeData1.setFullName("Иванов Иван Иванович");
        personalizeData1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        personalizeData1.setPlaceOfBirth("Москва");
        personalizeData1.setGender("м");
        personalizeData1.setInn("123456789012");
        personalizeData1.setSnils("123-456-789 00");
        personalizeData1.setContactInfo("ivanov@example.com");
        personalizeData1.setAddress("Москва, ул. Пушкина, д. 1");
        personalizeData1.setDocumentType("паспорт");
        personalizeData1.setDocumentNumber("1234 567890");

        DepersonalizeData personalizeData2 = new DepersonalizeData();
        personalizeData2.setFullName("Петров Петр Петрович");
        personalizeData2.setDateOfBirth(LocalDate.of(1980, 2, 2));
        personalizeData2.setPlaceOfBirth("Санкт-Петербург");
        personalizeData2.setGender("м");
        personalizeData2.setInn("123456789012");
        personalizeData2.setSnils("123-456-789 00");
        personalizeData2.setContactInfo("petrov@example.com");
        personalizeData2.setAddress("Санкт-Петербург, ул. Лермонтова, д. 2");
        personalizeData2.setDocumentType("паспорт");
        personalizeData2.setDocumentNumber("1234 567890");

        depersonalizeDataService.deleteAllData();
        depersonalizeDataService.saveData(personalizeData1);
        depersonalizeDataService.saveData(personalizeData2);
        ByteArrayOutputStream out = fileService.createFile();
        FileOutputStream fileOutputStream = new FileOutputStream("src/test/java/com/big_case_club/depersonalization/outputTestFile.xlsx");
        fileOutputStream.write(out.toByteArray());
    }
}
