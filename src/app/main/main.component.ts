import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface ContactOption {
  value: number;
  viewValue: string;
}

interface ContactAvailable {
  index : number,
  value : any
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

export interface Contact{
  name              : string,
  firstname         : string,
  status            : string,
  rappel            : number,
  titre             : string,
  email             : string,
  tel1              : string,
  tel2              : string,
  mobile            : string,
  linkedin          : string,
  observations      : string,
  outils            : string,
  pushs             : string[],
  plaquette         : {
                        date : number,
                        name : string
                      },
  conversations     : UserConversation[],
  besoins           : UserBesoin[]  
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedContact!: number;
  contacts: ContactOption[] = [
    {value: 0, viewValue: 'Isaac NDEMA'},
    {value: 1, viewValue: 'Junior BEKOLLE'}
  ];

  availableContacts : ContactAvailable[] =[
    { index :0 , value :  {
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
    },
    
    { index : 1 , value : {
      name              : 'BEKOLLE',
      firstname         : 'Junior',
      status            : 'black',
      rappel            : new Date('6/14/2021'),
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
                            date : new Date('6/14/2021'),
                            name : ''
                          },
      conversations     :[
                          {
                            date : '6/11/2021',
                            content : 'Test2',
                            tigramme : 'LSE'
                          },
                          {
                            date : '6/11/2021',
                            content : 'Test4',
                            tigramme : 'LSE'
                          }
                        ],
      besoins          :[
                        ]  
    }
    }
  ]


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

  initialContact :Contact = {
    name              : '',
    firstname         : '',
    status            : '',
    rappel            : Date.now(),
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
                          date : Date.now(),
                          name : ''
                        },
    conversations     : [],
    besoins          :[]  
  };

  currentContact : Contact = this.initialContact;

  pushChange(newvalue : string) : any{

  }

  currentContactChange =()=>{
    this.currentContact = this.availableContacts.filter( c=> c.index == this.selectedContact)[0].value;
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    this.dataSourceBesoin = new MatTableDataSource<UserBesoin>(this.currentContact.besoins);
  }

  newContact = ()=>{
    this.selectedContact =-1;
    this.currentContact  = this.initialContact;
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    this.dataSourceBesoin = new MatTableDataSource<UserBesoin>(this.currentContact.besoins);
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
