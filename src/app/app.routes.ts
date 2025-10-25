import { Routes } from '@angular/router';
import { OffersListComponent } from '../components/offers-list/offers-list.component';

export const routes: Routes = [
    { path: "", component: OffersListComponent },
    { path: '**', redirectTo: '' }
];
