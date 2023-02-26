package com.big_case_club.depersonalization;

import com.big_case_club.depersonalization.algoritms.DepersonalizationAlgorithms;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DepersonalizeUnitTest {

    @Autowired
    private DepersonalizationAlgorithms depersonalizationAlgorithms;

    @Test
    public void testDepersonalizeSnils() {
        PersonalizeData data = new PersonalizeData();
        data.setSnils("123-456-789 01");

        depersonalizationAlgorithms.depersonalizesnils(data);

        String newSnils = data.getSnils();
        Assertions.assertNotEquals(newSnils,"123-456-789 01");
        Assertions.assertTrue(newSnils.matches("\\d{3}-\\d{3}-\\d{3} \\d{2}"),
                "New SNILS format does not match (###-###-### ##): " + newSnils);
    }
    @Test
    public void testDepersonalizeInn() {
        PersonalizeData data = new PersonalizeData();
        data.setInn("123456789012");


        depersonalizationAlgorithms.depersonalizeinn(data);

        String newInn = data.getInn();
        Assertions.assertNotEquals(newInn,"123456789012");
        Assertions.assertTrue(newInn.matches("\\d{12}"),
                "New Inn format does not match (############): " + newInn);
    }
    @Test
    public void testDepersonalizeEqualsDateOfBirth() {
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setDateOfBirth(LocalDate.of(1990, 1, 1));
        PersonalizeData personalizeData2 = new PersonalizeData();
        personalizeData2.setDateOfBirth(LocalDate.of(1990, 1, 1));

        depersonalizationAlgorithms.depersonalizedateOfBirth(personalizeData1);
        depersonalizationAlgorithms.depersonalizedateOfBirth(personalizeData2);

        assertEquals(personalizeData1.getDateOfBirth(), personalizeData2.getDateOfBirth());
    }
    @Test
    public void testDepersonalizeDateOfBirth(){
        PersonalizeData data = new PersonalizeData();
        data.setDateOfBirth(LocalDate.of(1990, 1, 1));

        depersonalizationAlgorithms.depersonalizedateOfBirth(data);

        LocalDate ld = data.getDateOfBirth();
        Assertions.assertEquals(1990, ld.getYear(), "Year should not change");
        Assertions.assertNotEquals(1, ld.getDayOfMonth(), "Day should change");
    }

    @Test
    public void testDepersonalizeEqualsFullName() {
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setFullName("Иванов Иван Иванович");
        PersonalizeData personalizeData2 = new PersonalizeData();
        personalizeData2.setFullName("Иванов Иван Иванович");

        depersonalizationAlgorithms.depersonalizefullName(personalizeData1);
        depersonalizationAlgorithms.depersonalizefullName(personalizeData2);

        assertEquals(personalizeData1.getFullName(), personalizeData2.getFullName());
    }
    @Test
    public void testDepersonalizeFullName(){
        PersonalizeData data = new PersonalizeData();
        data.setFullName("Иванов Иван Иванович");

        depersonalizationAlgorithms.depersonalizefullName(data);

        Assertions.assertNotEquals("Иванов Иван Иванович", data.getFullName(), "Name should change");
    }
    @Test
    public void testDepersonalizeEqualsPaceOfBirth() {
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setPlaceOfBirth("Москва");
        PersonalizeData personalizeData2 = new PersonalizeData();
        personalizeData2.setPlaceOfBirth("Москва");

        depersonalizationAlgorithms.depersonalizeplaceOfBirth(personalizeData1);
        depersonalizationAlgorithms.depersonalizeplaceOfBirth(personalizeData2);

        assertEquals(personalizeData1.getPlaceOfBirth(), personalizeData2.getPlaceOfBirth());
    }
    @Test
    public void testDepersonalizePaceOfBirth(){
        PersonalizeData data = new PersonalizeData();
        data.setPlaceOfBirth("Москва");

        depersonalizationAlgorithms.depersonalizeplaceOfBirth(data);

        Assertions.assertNotEquals("Москва", data.getPlaceOfBirth(), "Place should change");
    }
    @Test
    public void testDepersonalizeEqualsContactInfo() {
        PersonalizeData personalizeData1 = new PersonalizeData();
        personalizeData1.setContactInfo("ivanov@example.com");
        PersonalizeData personalizeData2 = new PersonalizeData();
        personalizeData2.setContactInfo("ivanov@example.com");

        depersonalizationAlgorithms.depersonalizecontactInfo(personalizeData1);
        depersonalizationAlgorithms.depersonalizecontactInfo(personalizeData2);

        assertEquals(personalizeData1.getContactInfo(), personalizeData2.getContactInfo());
    }
    @Test
    public void testDepersonalizeContactInfo(){
        PersonalizeData data = new PersonalizeData();
        data.setContactInfo("ivanov@example.com");

        depersonalizationAlgorithms.depersonalizecontactInfo(data);

        Assertions.assertNotEquals("ivanov@example.com", data.getContactInfo(), "ContactInfo should change");
        Assertions.assertTrue(data.getContactInfo().matches("^[^@]+@[^@]+\\.[^@]+$"),
                "New contact info format is invalid: " + data.getContactInfo());
    }

    @Test
    public void testDepersonalizeDocumentNumber() {
        PersonalizeData data = new PersonalizeData();
        data.setDocumentNumber("1234 567890");

        depersonalizationAlgorithms.depersonalizedocumentNumber(data);

        String newDocument = data.getDocumentNumber();
        Assertions.assertNotEquals("1234 567890", newDocument, "Document number should change");
        Assertions.assertTrue(newDocument.matches("\\d{8}"),
                "New document number format is invalid: " + newDocument);
    }

    @Test
    public void testDepersonalizeAddress() {
        PersonalizeData data = new PersonalizeData();
        data.setAddress("Москва, ул. Пушкина, д. 1");

        depersonalizationAlgorithms.depersonalizeaddress(data);

        String newAddress = data.getAddress();
        Assertions.assertNotEquals("Москва, ул. Пушкина, д. 1", newAddress, "Address number should change");
        Assertions.assertTrue(newAddress.contains(",") && newAddress.contains("."),
                "New address should contain comma and period: " + newAddress);
    }

}
