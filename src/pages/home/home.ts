import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { EdituserPage } from '../edituser/edituser';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  dataElement:any;
  check:Boolean=false;
  
  url:string = 'http://localhost/read.php';
  public response : Array<any> = [];

  constructor(public navCtrl: NavController, public http: HttpClient,private notif:NotificationsService) {
      this.showTable();
  }
 

  showTable()
  {
   return new Promise(resolve =>
    {
        this.http.get(this.url+'/users').subscribe(data => 
        {
            resolve(data);
            this.dataElement=data;
            this.check=true;
            console.log(this.dataElement);
        },
        
        err =>
        {
            console.log(err);
            this.check=false;
        });
      });
    }

    delete(idelete:number)
    {
      var url = 'http://localhost/delete.php';
     var mydata = JSON.stringify({id : idelete});
    
     this.http.post(url, mydata)
       .subscribe(data => {
         console.log(JSON.stringify(data));
       },
       error => {
     console.log("Oooops!");
     this.notif.success("Record deleted");
     this.navCtrl.push(HomePage);
     });

     
    }

    edit(d_edit:number)
    {
      this.navCtrl.push(EdituserPage, {rowid:d_edit}
      );
    }
}
