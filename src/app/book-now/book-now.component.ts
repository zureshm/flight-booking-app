import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FlightBookingService } from '../flight-booking.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss']
})
export class BookNowComponent implements OnInit {

  submitForm:FormGroup;

  returnAttempting= this.flightService.retrunFlightBooking;

  flightName = this.flightService.airName;
  flightNumber = this.flightService.airNumber;
  flightTime = this.flightService.airTime;
  flightCost = this.flightService.airCost;

  flightNameReturn = this.flightService.airNameReturn;
  flightNumberReturn = this.flightService.airNumberReturn;
  flightTimeReturn = this.flightService.airTimeReturn;
  flightCostReturn = this.flightService.airCost;

  constructor(private flightService: FlightBookingService, private router: Router) { }

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      'firstname' :new FormControl(null, Validators.required),
      'lastname' :new FormControl(null, Validators.required),
      'email' :new FormControl(null, Validators.required),
      'mobile' :new FormControl(null, Validators.required)

    });
  }

  onSubmit(){
    this.router.navigate(["/thanks"]);
  }

}
