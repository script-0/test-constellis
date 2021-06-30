/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.constellis.test.entities;

/**
 *
 * @author Isaac
 */
public class Conversation {
    private String date;
    private String description;
    private String tigramme;

    public Conversation(String date, String description, String tigramme) {
        this.date = date;
        this.description = description;
        this.tigramme = tigramme;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTigramme() {
        return tigramme;
    }

    public void setTigramme(String tigramme) {
        this.tigramme = tigramme;
    }
    
}
