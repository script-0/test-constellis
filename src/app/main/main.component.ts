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
                        },
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
                          date : '',
                          description : '',
                          status : '',
                          ao : {
                                  state: '',
                                  link : ''
                              },
                          cv  :[
                                  {
                                    name : '',
                                    link : ''
                                  }
                               ],
                          date_envoi : ''
                        }

                      ]  
  }

  pushChange(newvalue : string) : any{

  }

  constructor() { }
  
  ngOnInit(): void {
  }


  displayedColumns: string[] = ['date', 'content', 'tigramme'];
  dataSourceConversation: MatTableDataSource<UserConversation> = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  newConversationText = 'New conversation';

  newConversation(){
    this.currentContact.conversations.push({
      date : '6/30/2021',
      content: this.newConversationText,
      tigramme : 'LSE'
    });

    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    this.newConversationText = '';
  }

}
