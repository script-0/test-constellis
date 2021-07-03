
package com.constellis.test.services;

import com.constellis.test.entities.Contact;
import org.springframework.stereotype.Service;
import com.constellis.test.repositories.ContactRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }

    public Contact save(Contact contact){
        return contactRepository.save(contact);
    }
}