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
public class Ao {
    private String state;
    private String link;

    public Ao(String state, String link) {
        this.state = state;
        this.link = link;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
