import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightBookingService } from '../flight-booking.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  currentItemsToShow= [];
  currentReturnItemsToShow= [];

  fromCity = this.flightService.fromCity;
  toCity = this.flightService.toCity;
  journeyDate = this.formattedDate(this.flightService.journeyDate);
  returnDate = this.flightService.returnDate != null? this.formattedDate(this.flightService.returnDate) : null;

  searchResult = [];
  returnSearchResult = []; //combined
  flightsFound = true;
  returnAttempting =false;
  returnFlightsFound = false;

  constructor(private flightService:FlightBookingService, private router: Router) { }

  ngOnInit(): void {
    if(!this.flightService.retrunFlightBooking){
      this.flightService.searchFlightList(this.fromCity, this.toCity, this.journeyDate).subscribe(flightDetails => {
        console.log(flightDetails);
        this.searchResult = flightDetails;
        if(flightDetails.length <= 0){
          this.flightsFound =false;
        }else {
          this.flightsFound =true;
        }
       //for mat paginator adjustment
       this.currentItemsToShow = this.searchResult.slice(0,5); //will show 1 to 5 results
      });
    }
    else{
      this.returnAttempting =true;
      this.flightService.searchReturnFlightList(this.fromCity, this.toCity, this.journeyDate, this.returnDate).subscribe(flightDetails => {
        console.log(flightDetails);
        this.searchResult = flightDetails[0];
        this.returnSearchResult = flightDetails[1];
        console.log(this.returnSearchResult)

        if(flightDetails[0].length <= 0 || flightDetails[1].length <= 0){
          this.returnFlightsFound =false;
        }else {
          this.returnFlightsFound =true;
        }

        //for mat paginator adjustment
        if(this.searchResult.length <= this.returnSearchResult.length){
          this.currentItemsToShow = this.searchResult.slice(0,5); //will show 1 to 5 results
        }else{
          this.currentItemsToShow = this.returnSearchResult.slice(0,5); //will show 1 to 5 results
        }

      });
    }






  }

  formattedDate(toFormat:Date){
    const inputDate = toFormat;
    const day = inputDate.getDate();
    const month = inputDate.getMonth()+1;
    const year = inputDate.getFullYear();
    const travelDate = month +"/"+day+"/"+year;
    return travelDate;
  }

  //for pagination component
  onPageChange($event) {
    this.currentItemsToShow =  this.searchResult.slice($event.pageIndex*$event.pageSize,
    $event.pageIndex*$event.pageSize + $event.pageSize);
  }

  bookNow(i){
    if(!this.returnAttempting){
      this.flightService.airName = this.searchResult[i].airline_name;
      this.flightService.airNumber = this.searchResult[i].flight_number;
      this.flightService.airTime = this.searchResult[i].depTime;
      this.flightService.airCost = this.searchResult[i].price;
    }else{
      this.flightService.airName = this.searchResult[i].airline_name;
      this.flightService.airNumber = this.searchResult[i].flight_number;
      this.flightService.airTime = this.searchResult[i].depTime;
      this.flightService.airNameReturn = this.returnSearchResult[i].airline_name;
      this.flightService.airNumberReturn = this.returnSearchResult[i].flight_number;
      this.flightService.airTimeReturn = "N/A";
      this.flightService.airCost = this.searchResult[i].price+this.returnSearchResult[i].price;
    }
    this.router.navigate(["/booknow"]);
  }


}
