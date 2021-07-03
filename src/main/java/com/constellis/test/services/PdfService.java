
package com.constellis.test.services;

import org.bson.types.ObjectId;
import com.constellis.test.entities.Pdf;
import org.springframework.stereotype.Service;
import com.constellis.test.repositories.PdfRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class PdfService {

    @Autowired
    private PdfRepository pdfRepo;

    public ObjectId addPdf(String title, MultipartFile file) throws IOException { 
        Pdf pdf = new Pdf(title,new Binary(BsonBinarySubType.BINARY, file.getBytes())); 
        pdf = pdfRepo.insert(pdf); 
        return pdf.getId();
    }

    public Pdf getPdf(ObjectId id) { 
        return pdfRepo.findById(id).get();
    }
}