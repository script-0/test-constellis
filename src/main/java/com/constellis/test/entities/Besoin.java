/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.constellis.test.entities;

import java.util.ArrayList;

/**
 *
 * @author Isaac
 */
public class Besoin {
    private String date;
    private String description;
    private Ao ao;
    private ArrayList<Cv> cv;
    private String date_envoi;

    public Besoin(String date, String description, Ao ao, ArrayList<Cv> cv, String date_envoi) {
        this.date = date;
        this.description = description;
        this.ao = ao;
        this.cv = cv;
        this.date_envoi = date_envoi;
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

    public Ao getAo() {
        return ao;
    }

    public void setAo(Ao ao) {
        this.ao = ao;
    }

    public ArrayList<Cv> getCv() {
        return cv;
    }

    public void setCv(ArrayList<Cv> cv) {
        this.cv = cv;
    }

    public String getDate_envoi() {
        return date_envoi;
    }

    public void setDate_envoi(String date_envoi) {
        this.date_envoi = date_envoi;
    }
    
    
}
