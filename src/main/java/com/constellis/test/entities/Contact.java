package com.constellis.test.entities;

import java.io.Serializable;
import java.util.UUID;
//import org.bson.types.String;
import java.util.ArrayList;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contacts")
public class Contact implements Serializable {

    @Id
    public String _id;
    private String name;
    private String firstname;    
    private String rappel;
    private String titre;
    private String email;
    private String tel1;
    private String tel2;
    private String mobile;
    private String linkedin;
    private String observations;
    private String outils;
    private ArrayList<String> pushs;
    private Plaquette plaquette;
    private ArrayList<Conversation> conversations;
    private ArrayList<Besoin> besoins;

    public Contact(String _id, String name, String firstname, String rappel, String titre, String email, String tel1, String tel2, String mobile, String linkedin, String observations, String outils, ArrayList<String> pushs, Plaquette plaquette, ArrayList<Conversation> conversations, ArrayList<Besoin> besoins) {
        super();
        this._id = _id;
        this.name = name;
        this.firstname = firstname;
        this.rappel = rappel;
        this.titre = titre;
        this.email = email;
        this.tel1 = tel1;
        this.tel2 = tel2;
        this.mobile = mobile;
        this.linkedin = linkedin;
        this.observations = observations;
        this.outils = outils;
        this.pushs = pushs;
        this.plaquette = plaquette;
        this.conversations = conversations;
        this.besoins = besoins;
    }

    public String getId(){
        return _id;
    }

    public void setId(String id){
        this._id =id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getRappel() {
        return rappel;
    }

    public void setRappel(String rappel) {
        this.rappel = rappel;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel1() {
        return tel1;
    }

    public void setTel1(String tel1) {
        this.tel1 = tel1;
    }

    public String getTel2() {
        return tel2;
    }

    public void setTel2(String tel2) {
        this.tel2 = tel2;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public String getOutils() {
        return outils;
    }

    public void setOutils(String outils) {
        this.outils = outils;
    }

    public ArrayList<String> getPushs() {
        return pushs;
    }

    public void setPushs(ArrayList<String> pushs) {
        this.pushs = pushs;
    }

    public Plaquette getPlaquette() {
        return plaquette;
    }

    public void setPlaquette(Plaquette plaquette) {
        this.plaquette = plaquette;
    }

    public ArrayList<Conversation> getConversations() {
        return conversations;
    }

    public void setConversations(ArrayList<Conversation> conversations) {
        this.conversations = conversations;
    }

    public ArrayList<Besoin> getBesoins() {
        return besoins;
    }

    public void setBesoins(ArrayList<Besoin> besoins) {
        this.besoins = besoins;
    }   
}
