import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.http = http;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdduserPage');
  }

   submit()
   {
     var url = 'http://localhost/write.php';
     var mydata = JSON.stringify({id : this.id.value, name: this.name.value, uname: this.uname.value, pass: this.pass.value, email: this.email.value, phone: this.phone.value });

     this.http.post(url, mydata)
       .subscribe(data => {
         console.log("Data : "+data);
         alert("User Added!!");
       }, error => {
     alert("Field Error!!");
     });
   }

  

}
