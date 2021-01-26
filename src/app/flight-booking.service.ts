import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FlightBookingService {

  apiUrl:string ="http://localhost:3000/";
  fromCity;
  toCity;
  journeyDate;
  returnDate;
  retrunFlightBooking = false;

  //FOR BOOKING CONFIRMATION
  airName:string;
  airNumber:string;
  airTime;
  airNameReturn:string;
  airNumberReturn:string;
  airTimeReturn;
  airCost;


  constructor(private http:HttpClient) { }

  callCityList() {
    return this.http.get<any>(this.apiUrl+'cities')
    .pipe(map(resData => {
      //console.log(resData);
      const cityList = resData.map(value => value.city);
      return cityList;
    }));
  }

  callFlightList() {
    return this.http.get<any>(this.apiUrl+"flights");
  }

  searchFlightList(fromCity, toCity, journeyDate) {
    return this.http.get<any>(this.apiUrl+"flights")
    .pipe(map(resData =>{
      //console.log(resData);
      let flightList = resData.filter(value => {return (value.fromCity == fromCity && value.toCity == toCity) && value.travelDate == journeyDate});
      return flightList;
    }))
    ;
  }

  searchReturnFlightList(fromCity, toCity, journeyDate, returnDate?) {
    return this.http.get<any>(this.apiUrl+"flights")
    .pipe(map(resData =>{
      //console.log(resData);
      let flightList = resData.filter(value => {return (value.fromCity == fromCity && value.toCity == toCity) && value.travelDate == journeyDate});
      let returnList = resData.filter(value => {return (value.fromCity == toCity && value.toCity == fromCity) && value.travelDate == returnDate});

      return [flightList, returnList];
    }))
    ;
  }
}
