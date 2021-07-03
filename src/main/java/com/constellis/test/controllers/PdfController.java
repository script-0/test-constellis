/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.constellis.test.controllers;


import com.constellis.test.services.PdfService;
import com.constellis.test.entities.Pdf;
import java.util.ArrayList;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
/**
 *
 * @author Isaac
 */

@CrossOrigin(origins="*")
@RestController
@RequestMapping("api")
public class PdfController {
  
    private final PdfService pdfService;

    @Autowired
    public PdfController(PdfService service){
        this.pdfService = service;
    }

    @PostMapping("/pdfs/add")
    public ObjectId addPdf(@RequestParam("image") MultipartFile image) throws IOException 
    {
        String id = pdfService.addPdf(image.getOriginalFilename(), image);
        return id;
    }

    @PostMapping("/pdfs/get")
    public byte[] getPdf(@RequestBody ObjectId id) {
        byte[] data = null;
        Pdf pdf = pdfService.getPdf(id);
        data= pdf.getImage().getData();
        return data;
    }
}
