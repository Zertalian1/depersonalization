package com.big_case_club.depersonalization.service;

import com.big_case_club.depersonalization.model.depersonalize.DepersonalizeData;
import com.big_case_club.depersonalization.model.personalize.PersonalizeData;
import lombok.AllArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class FileService {
    private PersonalizeDataService personalizeDataService;

    private DepersonalizeDataService depersonalizeDataService;
    public boolean createDatabase(MultipartFile file) {
        try (InputStream inputStream = file.getInputStream();
             XSSFWorkbook myExcelBook = new XSSFWorkbook(inputStream)
        ){
            personalizeDataService.deleteAllData();
            for(int i=0; i< myExcelBook.getNumberOfSheets(); i++) {
                XSSFSheet sheet = myExcelBook.getSheetAt(i); // берём i страницу
                for (Row row : sheet) {
                    personalizeDataService.saveData(
                            new PersonalizeData(
                                    (long)row.getCell(0).getNumericCellValue(),
                                    row.getCell(1).getStringCellValue(),
                                    row.getCell(2).getDateCellValue().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                                    row.getCell(3).getStringCellValue(),
                                    row.getCell(4).getStringCellValue(),
                                    row.getCell(5).getStringCellValue(),
                                    row.getCell(6).getStringCellValue(),
                                    row.getCell(7).getStringCellValue(),
                                    row.getCell(8).getStringCellValue(),
                                    row.getCell(9).getStringCellValue(),
                                    row.getCell(10).getStringCellValue()));
                }
            }
        } catch (IOException e) {
            return false;
        }
        return true;
    }

    public ByteArrayOutputStream createFile() throws IOException {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        try (Workbook wb = new XSSFWorkbook()){
            CreationHelper createHelper = wb.getCreationHelper();
            Sheet sheet = wb.createSheet("database");

            DataFormat format = wb.createDataFormat();
            CellStyle dateStyle = wb.createCellStyle();
            dateStyle.setDataFormat(format.getFormat("dd.mm.yyyy"));

            List<DepersonalizeData> database = depersonalizeDataService.viewDatabase();
            for (int i = 0; i < database.size(); i++) {

                Row row = sheet.createRow(i);

                row.createCell(0).setCellValue(database.get(i).getId());
                row.createCell(1).setCellValue(createHelper.createRichTextString(database.get(i).getFullName()));
                Cell birthdate = row.createCell(2);
                birthdate.setCellStyle(dateStyle);
                birthdate.setCellValue(Date.from(database.get(i).getDateOfBirth().atStartOfDay(ZoneId.systemDefault()).toInstant()));
                row.createCell(3).setCellValue(createHelper.createRichTextString(database.get(i).getPlaceOfBirth()));
                row.createCell(4).setCellValue(createHelper.createRichTextString(database.get(i).getGender()));
                row.createCell(5).setCellValue(createHelper.createRichTextString(database.get(i).getInn()));
                row.createCell(6).setCellValue(createHelper.createRichTextString(database.get(i).getSnils()));
                row.createCell(7).setCellValue(createHelper.createRichTextString(database.get(i).getContactInfo()));
                row.createCell(8).setCellValue(createHelper.createRichTextString(database.get(i).getAddress()));
                row.createCell(9).setCellValue(createHelper.createRichTextString(database.get(i).getDocumentType()));
                row.createCell(10).setCellValue(createHelper.createRichTextString(database.get(i).getDocumentNumber()));
            }
            wb.write(stream);
        }
        return stream;
    }

}
