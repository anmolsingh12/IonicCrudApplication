import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {HomePage} from '../home/home';
import {NotificationsService} from 'angular2-notifications';
@IonicPage()
@Component({
  selector: 'page-adduser',
  templateUrl: 'adduser.html',
})
export class AdduserPage {

  @ViewChild('id')id;
  @ViewChild('name')name;
  @ViewChild('uname')uname;
  @ViewChild('pass')pass;
  @ViewChild('email')email;
  @ViewChild('phone')phone;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private notif:NotificationsService) {
    this.http = http;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

   submit()
   {
     if(!this.id.value && !this.name.value && !this.uname.value && !this.pass.value && !this.email.value && !this.phone.value)
     {
      this.notif.error("Error","All Mandatory Fields Required!!!",
    {
      timeout:2000,
      clickToClose:true,
      pauseOnHover:true,
      showProgresBar:true
    }) 
     // this.errorNotification("All field required");
     }
     else
     {
     var url = 'http://localhost/write.php';
     var mydata = JSON.stringify({id : this.id.value, name: this.name.value, uname: this.uname.value, pass: this.pass.value, email: this.email.value, phone: this.phone.value });
     console.log("Data : "+mydata);
     this.http.post(url, mydata)
       .subscribe(data => {
         console.log("Data : "+data);
         alert("User Added!!");
         this.navCtrl.push(HomePage);
       }, error => {
     alert("Field Error!!");
     });
     
    }
   }

  //  errorNotification(msg)
  //  {
  //    this.notif.error
  //    (
  //      "Error",msg,
  //      {
  //        timeout:2000,
         

  //      }

  //    );

  //  }

  

}
