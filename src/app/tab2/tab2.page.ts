import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
  slideOpts = {
    effect: 'flip'
  };
  private appId: string;
  private appCode: string;
  public weather: any;

  public constructor(private http: HttpClient) {
    this.appId = "7WPZcWJSbmf5j2D0her2";
    this.appCode = "-3ff89yW-ujkE-CJThynfA";
    this.weather = [];
  }
  public ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.getWeather(position.coords);
      });
    } else {
      console.error("The browser does not support geolocation...");
    }
  }
  public getWeather(coordinates: any) {
    this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
      .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
      .subscribe(result => {
        this.weather = result.forecast;
      }, error => {
        console.error(error);
      });
  }
}
