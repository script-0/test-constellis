package com.constellis.test.entities;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.io.Serializable;

@Document(collection = "pdfs")
public class Pdf implements Serializable{
    @Id
    private String id;
    
    private String title;
        
    private Binary image;

    public Pdf(){

    }
    
    public Pdf(String id, String title, Binary image){
        this.id = id;
        this.title =title;
        this.image = image;
    }

    public Pdf(String title, Binary image){
        this.title =title;
        this.image = image;
    }

    public String getId() {return this.id;}

    public void setId(String id){
        this.id = id;
    }

    public void setImage( Binary image){
        this.image = image;
    }

    public void setTitle( String title){
        this.title =title;
    }

    public Binary getImage(){
        return this.image;
    }

    public String getTitle(){
        return this.title;
    }
}