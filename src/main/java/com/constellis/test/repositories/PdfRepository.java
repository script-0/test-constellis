/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.constellis.test.repositories;

import com.constellis.test.entities.Pdf;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

/**
 *
 * @author Isaac
 */

@Repository
public interface PdfRepository extends MongoRepository<Pdf, String> {
}
