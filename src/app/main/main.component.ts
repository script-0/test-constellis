import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient  } from '@angular/common/http';

interface ContactOption {
  value: number;
  viewValue: string;
}

interface ContactAvailable {
  index : number,
  value : Contact
}

interface Push{
  value: string;
}

export interface UserConversation {
  date: string;
  description: string;
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

export interface IdMongo{
  timestamp : number,
  date      : Date
}

export interface Contact{
  _id               : IdMongo | null,
  name              : string,
  firstname         : string,
  status            : string,
  rappel            : Date,
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
                        date : Date,
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
export class MainComponent implements OnInit,AfterViewInit {
  selectedContact!: number;
  /*
    =[
    { index :0 , value :  {
      _id               : null,
      name              : 'NDEMA',
      firstname         : 'Isaac',
      status            : 'black',
      rappel            : '6/11/2021',
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
                            date : '6/11/2021',
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
                          },
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
                          ,
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
      _id               : null,
      name              : 'BEKOLLE',
      firstname         : 'Junior',
      status            : 'black',
      rappel            : '6/14/2021',
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
                            date : '6/14/2021',
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
  */
  contacts: ContactOption[] = [];

  availableContacts : ContactAvailable[] = [];

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
    _id               : null,
    name              : '',
    firstname         : '',
    status            : '',
    rappel            : new Date(),
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
                          date : new Date(),
                          name : ''
                        },
    conversations     : [],
    besoins          :[]  
  };

  currentContact : Contact = this.initialContact;
  isLoadingResults : boolean = false;

  pushChange(newvalue : string) : any{

  }

  currentContactChange =()=>{
    this.currentContact = this.availableContacts.filter( c=> c.index == this.selectedContact)[0].value;
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    this.dataSourceBesoin = new MatTableDataSource<UserBesoin>(this.currentContact.besoins);
    //this.ngAfterViewInit();
  }

  newContact = ()=>{
    this.selectedContact =-1;
    this.currentContact  = this.initialContact;
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    this.dataSourceBesoin = new MatTableDataSource<UserBesoin>(this.currentContact.besoins);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort!: MatSort;
  requestUrl = {
    'list_contacts': 'http://localhost:9090/api/contacts'
  }
  //private backend: HttpClient
  constructor(private backend: HttpClient) { }

  ngAfterViewInit(): void {
    let i =0;
    this.backend.get<Contact[]>(this.requestUrl.list_contacts).pipe(catchError(() => observableOf(null))).subscribe( data =>{
      data?.forEach( contact => {
        contact.rappel = new Date(contact.rappel);
        contact.plaquette.date = new Date(contact.plaquette.date);
        this.availableContacts.push({index : i , value : contact });
        this.contacts.push({value : i, viewValue: contact.firstname+' '+contact.name});
        i = i+1;
      })
    });
  }
  
  ngOnInit(): void {
   //this.dataSourceBesoin.sort = this.sort; this.dataSourceBesoin.paginator = this.paginator;
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
      description: this.newConversationText,
      tigramme : 'LSE'
    });

    this.newConversationText = '';
    
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    
  }

}
