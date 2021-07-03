import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';

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

export interface Contact{
  _id               : string | null,
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
    alert('Fonctionnalité pas prise en compte');
    /*this.selectedContact =-1;
    this.currentContact  = this.initialContact;
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    this.dataSourceBesoin = new MatTableDataSource<UserBesoin>(this.currentContact.besoins);
    */
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort,{ static: false }) sort!: MatSort;

  requestUrl = {
    'list_contacts': 'https://constellis-test-backend.herokuapp.com/api/contacts',
    'save_contact' : {
      'url' : 'https://constellis-test-backend.herokuapp.com/api/contact/add',
      'method' : 'POST'
    },
    'upload_pdf' : {
      'url' : 'https://constellis-test-backend.herokuapp.com/api/pdfs/add',
      'method' : 'POST'
    },
    'get_pdf' : {
      'url' : 'https://constellis-test-backend.herokuapp.com/api/pdfs/get',
      'method' : 'POST'
    },
    'get_pdf_name':{
      'url' : 'https://constellis-test-backend.herokuapp.com/api/pdfs/getname',
      'method' : 'POST'
    }
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
  disabledSave = false;
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
    this.currentContact.conversations.unshift({
      date : (new Date()).toLocaleDateString()+'-'+ (new Date()).toLocaleTimeString(),
      description: this.newConversationText,
      tigramme : 'LSE'
    });

    this.newConversationText = '';
    
    this.dataSourceConversation = new MatTableDataSource<UserConversation>(this.currentContact.conversations);
    
  }

  addBesoin = ()=>{
    this.currentContact.besoins.unshift({
      date : (new Date()).toLocaleDateString()+'-'+ (new Date()).toLocaleTimeString(),
      description : this.newBesoin.description,
      status : this.newBesoin.status,
      ao : {
        state: this.newBesoin.ao.state,
        link : this.newBesoin.ao.link
      },
      cv  : [{
        name : this.newBesoin.cv.name,
        link : this.newBesoin.cv.link
      }],
      date_envoi : (new Date()).toLocaleDateString()+'-'+ (new Date()).toLocaleTimeString()
    });

    this.newBesoin = {
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
    };

    this.dataSourceBesoin = new MatTableDataSource<UserBesoin>(this.currentContact.besoins);
  }
  selectedCV?: File;
  selectedAO?: File;

  selectCV(event: any, index : number): void {
    this.selectedCV = event.target.files[0];
    console.log("No CV selected");
    if(this.selectedCV){
      this.upload(this.selectedCV).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log("Upload : " +Math.round(100 * event.loaded / event.total) + '%');

          } else if (event instanceof HttpResponse) {
            let res = event.body;
            console.log("Response : "+res);
            this.currentContact.besoins[index].cv[0].link = res;
          }
          //alert('upload completed');
        },
        (err: any) => {
          console.log(err);

          if (err.error && err.error.responseMessage) {
            console.log(" Error : "+ err.error.responseMessage);
          } else {
            if(err.error.text) {
              this.currentContact.besoins[index].cv[0].link = err.error.text;
            }
          }
          this.selectedCV = undefined;
        }
      );
    }
  }

  selectAO(event: any, index : number): void {
    this.selectedAO = event.target.files[0];
    console.log("No AO selected");
    if(this.selectedAO){
      this.upload(this.selectedAO).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log("Upload : " +Math.round(100 * event.loaded / event.total) + '%');

          } else if (event instanceof HttpResponse) {
            let res = event.body;
            console.log("Response : "+res);
            this.currentContact.besoins[index].ao.link = res;
          }
          //alert('upload completed');
        },
        (err: any) => {
          console.log(err);

          if (err.error && err.error.responseMessage) {
            console.log(" Error : "+ err.error.responseMessage);
          } else {
            if(err.error.text){
              this.currentContact.besoins[index].ao.link = err.error.text;
            }
          }
          this.selectedAO = undefined;
        }
      );
    }
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('pdf', file);

    const req = new HttpRequest(this.requestUrl.upload_pdf.method, this.requestUrl.upload_pdf.url, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.backend.request(req);
  }

  loadCV = (index:number)=>{
    if(this.currentContact.besoins[index].cv[0].link || this.currentContact.besoins[index].cv[0].link != ''){
      console.log(this.currentContact.besoins[index].cv[0].link);
      const req_get_cv = new HttpRequest(this.requestUrl.get_pdf.method, this.requestUrl.get_pdf.url,this.currentContact.besoins[index].cv[0].link,{
        responseType : 'blob'
      });
      this.backend.request(req_get_cv).subscribe(
        (blob:any) => {
          console.log("Response : "+blob.body);
          if(blob.body){
            var a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(blob.body);
            const req_get_cv_name = new HttpRequest(this.requestUrl.get_pdf_name.method, this.requestUrl.get_pdf_name.url,this.currentContact.besoins[index].cv[0].link,{
              responseType :'text'        
            });
            this.backend.request(req_get_cv_name).subscribe(
              (filename:any) => {
                if(filename.body){
                  console.log("response : "+filename.body);
                  a.download = filename.body;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
            });
          }
        }
      );
    }else{
      alert('Pas the CV trouvé');
    }
  }

  loadAO = (index:number)=>{
    if( this.currentContact.besoins[index].ao.link && this.currentContact.besoins[index].ao.link != ''){
      console.log(this.currentContact.besoins[index].ao.link);
      const req_get_cv = new HttpRequest(this.requestUrl.get_pdf.method, this.requestUrl.get_pdf.url,this.currentContact.besoins[index].ao.link,{
        responseType : 'blob'
      });
      this.backend.request(req_get_cv).subscribe(
        (blob:any) => {
          console.log("Response : "+blob.body);
          if(blob.body){
            var a = window.document.createElement('a');
            a.href = window.URL.createObjectURL(blob.body);
            const req_get_cv_name = new HttpRequest(this.requestUrl.get_pdf_name.method, this.requestUrl.get_pdf_name.url,this.currentContact.besoins[index].ao.link,{
              responseType :'text'        
            });
            this.backend.request(req_get_cv_name).subscribe(
              (filename:any) => {
                if(filename.body){
                  console.log("response : "+filename.body);
                  a.download = filename.body;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }
            });
          }
        }
      );
    }else{
      alert('Pas the AO trouvé');
    }
  }

  saveContact = ()=>{
    this.disabledSave = true;
    const req_save_contact = new HttpRequest(this.requestUrl.save_contact.method, this.requestUrl.save_contact.url,this.currentContact,{
      responseType : 'json'
    });
    let i = 1;
    this.backend.request(req_save_contact ).subscribe(
      (blob:any) => {
        console.log("Response : "+blob.body);
        if(blob.body){
          alert("Contact enregistré avec succès");
        }else{
          if( i == 0 ) {
            alert("Une erreur est survenue");
          }else{
            i = i-1;
          }
        }
        this.disabledSave = false;
      }
    )
  }
   
}
