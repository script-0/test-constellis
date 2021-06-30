import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface Contact {
  value: string;
  viewValue: string;
}

interface Push{
  value: string;
}

export interface UserConversation {
  date: string;
  content: string;
  tigramme: string;
}

export interface UserBesoin{
  date : string,
  description : string,
  status : string,
  ao : UserAO,
  cv  : UserCV[],
  date_envoi : string
}

export interface UserCV{
  name : string,
  link : string
}

export interface UserAO{
  state: string,
  link : string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedContact!: string;
  contacts: Contact[] = [
    {value: '17P123', viewValue: 'Isaac NDEMA'},
    {value: '17P124', viewValue: 'Junior BEKOLLE'},
    {value: '17P125', viewValue: 'Franck CRIPS'},
    {value: '17P126', viewValue: 'Edouard LARIS'}
  ];

  availablePushs: Push[] = [
    {value: ''},
    {value: 'Node JS'},
    {value: 'Angular'},
    {value: 'Java'},
    {value: 'Express'},
    {value: 'Spring Boot'},
    {value: 'MongoDB'},
    {value: 'React'},
    {value: 'Python'}
  ];

  currentContact  = {
    name              : 'NDEMA',
    firstname         : 'Isaac',
    status            : 'black',
    rappel            : new Date('6/11/2021'),
    titre             : '',
    email             : '',
    tel1              : '',
    tel2              : '',
    mobile            : '',
    linkedin          : '',
    observations      : '',
    outils            : '',
    pushs             : ['','','','','','','',''],
    plaquette         : {
                          date : new Date('6/11/2021'),
                          name : ''
                        },
    conversations     :[
                        {
                          date : '6/11/2021',
                          content : 'Pas decisionnaire',
                          tigramme : 'LSE'
                        },
                        {
                          date : '6/11/2021',
                          content : 'Pas decisionnaire',
                          tigramme : 'LSE'
                        }
                      ],
    besoins          :[
                        {
                          date : '6/11/2021',
                          description : 'Bon profil j2ee',
                          status : 'Terminé',
                          ao : {
                                  state: 'oui',
                                  link : 'example.com'
                              },
                          cv  :[
                                  {
                                    name : 'Isaac',
                                    link : 'example.com/cv'
                                  }
                               ],
                          date_envoi : '6/13/2021'
                        }
                      ]  
  }

  pushChange(newvalue : string) : any{

  }

  constructor() { }
  
  ngOnInit(): void {
  }


  displayedColumnsConversation: string[] = ['date', 'content', 'tigramme'];
  displayedColumnsBesoin: string[] = ['date', 'description', 'status', 'ao', 'cv', 'date_envoi'];
  dataSourceConversation: MatTableDataSource<UserConversation> = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
  dataSourceBesoin: MatTableDataSource<UserBesoin> = new MatTableDataSource<UserBesoin>(this.currentContact.besoins);
 

  newConversationText = '';
  newBesoin = {
    description : '',
    status : '',
    ao : {
        state : '',
        link  : ''
    },
    cv :{
      name : '',
      link  : ''
    }
  }
  newConversation(){
    this.currentContact.conversations.push({
      date : '6/30/2021',
      content: this.newConversationText,
      tigramme : 'LSE'
    });

    this.newConversationText = '';
    
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    
  }

}
