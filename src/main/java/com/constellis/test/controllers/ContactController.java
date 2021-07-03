/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.constellis.test.controllers;


import com.constellis.test.services.ContactService;
import com.constellis.test.entities.Contact;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 *
 * @author Isaac
 */

@CrossOrigin(origins="*")
@RestController
@RequestMapping("api")
public class ContactController {
  
  private final ContactService contactService;

  @Autowired
  public ContactController(ContactService service){
    this.contactService = service;
  }

  @GetMapping("/contacts")
  public List<Contact> getAllContacts() {
    List<Contact> contacts = new ArrayList<Contact>();
    contactService.findAll().forEach( (Contact contact)->{
        contacts.add(contact);
    }
    );
    if (contacts.isEmpty()) {
        System.out.printf("Contacts Empty");
      return contacts;
    }
    return contacts;
  }
}
