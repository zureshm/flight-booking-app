import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FlightBookingService } from "../flight-booking.service";

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent implements OnInit {
  searchForm:FormGroup;

  startDate : Date; //flying date;
  returnDate : Date; //return date;
  tripType = [
    {name :'oneway', value: 1, htmlValue: 'ONE WAY' },
    {name :'roundtrip', value: 2, htmlValue: 'ROUND TRIP' }
  ];

  sourceCities = [];



  filteredCities: Observable<string[]>;
  private _CurentCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sourceCities.filter(xxx => xxx.toLowerCase().startsWith(filterValue));
  }

  filteredCities2: Observable<string[]>;
  private _CurentCity2(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.sourceCities.filter(xxx => xxx.toLowerCase().startsWith(filterValue));
  }

  constructor(private flightService: FlightBookingService, private router: Router) { }

  ngOnInit(): void {

    this.flightService.callCityList().subscribe( resData => {
      this.sourceCities = resData;
    })

    this.searchForm = new FormGroup({
      'returncheck' :new FormControl(1),
      'sourcecity' :new FormControl(null, Validators.required),
      'destinationcity' :new FormControl(null, Validators.required),
      'journeydate' :new FormControl(null, Validators.required),
      'returndate' :new FormControl(null),

    });
    this.filteredCities = this.searchForm.get('sourcecity').valueChanges
    .pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._CurentCity(value): [])
    );

    this.filteredCities2 = this.searchForm.get('destinationcity').valueChanges
    .pipe(
      startWith(''),
      map(value => value.length >= 1 ? this._CurentCity2(value): [])
    );

  }

  onChange_startDate(){
    this.startDate = this.searchForm.get('journeydate').value;
  }

  onSubmit(){
    const startPlace= this.searchForm.get('sourcecity').value;
    const endPlace = this.searchForm.get('destinationcity').value;
    const journeyDate = this.searchForm.get('journeydate').value;
    const returnDate = this.searchForm.get('returndate').value;
    this.flightService.fromCity = startPlace;
    this.flightService.toCity = endPlace;
    this.flightService.journeyDate = journeyDate;
    if(returnDate == null){
      this.flightService.retrunFlightBooking =false;
    }else{
      this.flightService.retrunFlightBooking =true;
      this.flightService.returnDate = returnDate;
    }
    this.router.navigate(["/result"]);
  }


}
