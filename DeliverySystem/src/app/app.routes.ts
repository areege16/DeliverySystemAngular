import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { GetAvailabeSlotsComponent } from './Pages/get-availabe-slots/get-availabe-slots.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent , title:'Home'},

    { path: 'AvailabeSlots', component: GetAvailabeSlotsComponent, title:'Available Slots'},

    { path: '**', component: NotFoundComponent ,title:'Error'}

];
