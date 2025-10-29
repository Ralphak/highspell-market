import { Routes } from '@angular/router';
import { OffersListComponent } from 'components/offers-list/offers-list.component';
import { CreateOfferComponent } from 'components/create-offer/create-offer.component';

export const routes: Routes = [
    { path: "", component: OffersListComponent },
    { path: "create-offer", component: CreateOfferComponent },
    { path: '**', redirectTo: '' }
];
