import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userdata: any;
  public yesterdayData: any;
  public todayData: any;
  public userUrl: string = 'https://api.fitbit.com/1/user/-/profile.json';
  public heartUrl: string = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json';
  public body: any;
  // public token: string = 'Bearer ';

  public name: string = null;
  public age: string = null;

  public maxHeart: string = null;
  public minHeart: string = null;

  constructor(public navCtrl: NavController, public http: Http) {

    let headers = new Headers();
    headers.append('Authorization', this.token);

    // ユーザー情報
    http
      .get(this.userUrl, { headers: headers })
      .map(res => res.json()).subscribe(data => {
        console.log(data);
        this.userdata = data;
        this.name = data.user.fullName;
        this.age = data.user.age;
      });
    let now = new Date();
    let yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    let yd: string = yesterday.getFullYear().toString() + '-' + yesterday.getMonth().toString() + '-' + yesterday.getDate().toString();
    console.log(yd);
    // 昨日の情報
    http
      .get('https://api.fitbit.com/1/user/-/activities/heart/date/'+ yd +'/1d.json', { headers: headers })
      .map(res => res.json()).subscribe(data => {
        console.log(data);
        this.yesterdayData = data;
          
      });

      // 昨日の情報
    http
    .get(this.heartUrl, { headers: headers })
    .map(res => res.json()).subscribe(data => {
      console.log(data);
      this.todayData = data;
    });

  }
}