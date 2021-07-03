
package com.constellis.test.services;

import org.bson.types.Binary;
import java.io.IOException;
import com.constellis.test.entities.Pdf;
import org.springframework.stereotype.Service;
import com.constellis.test.repositories.PdfRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.bson.BsonBinarySubType;

@Service
public class PdfService {

    @Autowired
    private PdfRepository pdfRepo;

    public String addPdf(String title, MultipartFile file) throws IOException { 
        Pdf pdf = new Pdf(title,new Binary(BsonBinarySubType.BINARY, file.getBytes())); 
        pdf = pdfRepo.insert(pdf); 
        return pdf.getId();
    }

    public Pdf getPdf(String id) { 
        return pdfRepo.findById(id).get();
    }
}