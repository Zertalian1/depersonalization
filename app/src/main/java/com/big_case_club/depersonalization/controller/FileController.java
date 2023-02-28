package com.big_case_club.depersonalization.controller;

import com.big_case_club.depersonalization.service.FileService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;

@Controller
@AllArgsConstructor
public class FileController {

    private FileService fileService;

    @PostMapping("/api/database/personalize/upload-file")
    @ResponseBody
    public ResponseEntity<Object> fileDownload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if(!fileService.createDatabase(file)){
            return ResponseEntity.badRequest().body(
                    """
                            некорректный файл необходимы данные формата
                            1) Id: Numeric
                            2) Full name: String
                            3) Date of birth: Date
                            4) Place of birth: String
                            5) Gender: String
                            6) Inn : String
                            7) Snils: String
                            8) ContactInfo: String
                            9) Address: String
                            10) Document type: String
                            11) Document number: String""");
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/database/depersonalize/download-file")
    @ResponseBody
    public ResponseEntity<Resource> fileUpload() {
        try {
            ByteArrayOutputStream resource = fileService.createFile();
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "force-download"));
            header.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=depersonalizeDatabase.xlsx");
            return new ResponseEntity<>(new ByteArrayResource(resource.toByteArray()),
                    header, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
