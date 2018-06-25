import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-edituser',
  templateUrl: 'edituser.html',
})

export class EdituserPage {
  @ViewChild('rowId')rowId;
  @ViewChild('rowName')rowName;
  @ViewChild('rowUname')rowUname;
  @ViewChild('rowEmail')rowEmail;
  @ViewChild('rowPhone')rowPhone;


  rowid:number;
  dataElement:any;
  editElement:EditElement[]=[];
  check:Boolean=false;
  url:string = 'http://localhost/read.php';
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.rowid = navParams.get('rowid');
    console.log(this.rowid);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EdituserPage');
  }

  getUserData()
  {
    return new Promise(resolve =>
      {
          this.http.get(this.url+'/users').subscribe(data => 
          {
              resolve(data);
              this.dataElement=data;
              this.check=true;
              for(let d of this.dataElement)
              {
                if(d.id==this.rowid)
                {
                  this.editElement.push({id:d.id,name:d.name,uname: d.uname,email: d.email,phone: d.phone});
                  console.log(this.editElement);
                }
              }
              
              
          },
          
          err =>
          {
              console.log(err);
              this.check=false;
          });
        });
  }

  updateUserData()
   {
     var url = 'http://localhost/update.php';
      let mydata:any = JSON.stringify({id : this.rowId.value, name: this.rowName.value, uname: this.rowUname.value, email: this.rowEmail.value, phone: this.rowPhone.value});
      console.log(mydata);
      this.http.post(url, mydata)
        .subscribe(data => {
          
            console.log("Data : "+mydata);
            alert("Data Updated!!");
          
          
          error=>{
          
          }
          
        });
   }

  ngOnInit()
  {
    this.getUserData();
  }
}
export interface EditElement
{
  id:number,
  name:string,
  uname:string,
  email:string,
  phone:string
}
