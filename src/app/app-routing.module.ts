import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookNowComponent } from './book-now/book-now.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  {
    path : "",
    component : SearchFlightsComponent
  },
  {
    path : "result",
    component : SearchResultsComponent
  },
  {
    path : "booknow",
    component : BookNowComponent
  },
  {
    path : "thanks",
    component : ThankYouComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
