import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeatArrangementsComponent } from './components/seat-arrangements/seat-arrangements.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
//   routes: Routes = [
//     { path: 'seat-arrangements' , component: SeatArrangementsComponent },
//     { path: '',   redirectTo: '/seat-arrangements', pathMatch: 'full' }, // redirect to `seatArrangement`
// ];
}
