package com.big_case_club.depersonalization;

import com.big_case_club.depersonalization.algoritms.DepersonalizationAlgorithms;
import com.big_case_club.depersonalization.controller.DepersonalizeDataController;
import com.big_case_club.depersonalization.controller.PersonalizeDataController;
import com.big_case_club.depersonalization.dto.DepersonalizeDataDTO;
import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import com.big_case_club.depersonalization.service.Depersonalizator;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional(transactionManager = "personalizeTransactionManager")
public class DepersonalizeE2ETest {

    @Autowired
    DepersonalizeDataController depersonalizeDataController;

    @Autowired
    PersonalizeDataController personalizeDataController;

    @Autowired
    DepersonalizationAlgorithms depersonalizationAlgorithms;

    @Autowired
    Depersonalizator depersonalizator;

    @Test
    public void mainTest() {
        // Создаем тестовые данные
        DepersonalizeDataDTO dto = new DepersonalizeDataDTO(false,true,true,true,true,true,true,true);
        PersonalizeData personalizeData = new PersonalizeData();
        personalizeData.setFullName("Михаил Паньков Вячеславович");
        personalizeData.setDateOfBirth(LocalDate.of(2002, 12, 27));
        personalizeData.setPlaceOfBirth("Новосибирск");
        personalizeData.setGender("м");
        personalizeData.setInn("210987654321");
        personalizeData.setSnils("333-333-333 11");
        personalizeData.setContactInfo("d.pankov@g.nsu.ru");
        personalizeData.setAddress("Новосибирск, ул. Советская, д. 19");
        personalizeData.setDocumentType("паспорт");
        personalizeData.setDocumentNumber("4321 666666");

        // Сохраняем данные в базу и деперсонализируем
        personalizeDataController.createData(personalizeData);
        Boolean result = depersonalizator.depersonalize(dto);

        Assertions.assertNotEquals(null,result);
        int pageSize = depersonalizeDataController.getPages();
        List<DepersonalizeData> depersonalizeDataList = depersonalizeDataController.viewDatabase("Id", pageSize-1, "ASC");
        DepersonalizeData depersonalizeData = depersonalizeDataList.get(depersonalizeDataList.toArray().length - 1);
        Assertions.assertEquals("Михаил Паньков Вячеславович",depersonalizeData.getFullName());
        Assertions.assertNotEquals("Новосибирск",depersonalizeData.getPlaceOfBirth());
        Assertions.assertNotEquals("210987654321",depersonalizeData.getInn());
        Assertions.assertNotEquals("333-333-333 11",depersonalizeData.getSnils());
        Assertions.assertNotEquals("d.pankov@g.nsu.ru",depersonalizeData.getContactInfo());
        Assertions.assertNotEquals("Новосибирск, ул. Советская, д. 19",depersonalizeData.getAddress());
        Assertions.assertNotEquals("4321 666666",depersonalizeData.getDocumentNumber());
    }

}
