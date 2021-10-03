import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchAvailableBooksComponent } from './books/search-available-books.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './books/home.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PurchaseordersComponent } from './books/orders/purchaseorders.component';
import { ReceiveordersComponent } from './books/orders/receiveorders.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';


@NgModule({
  declarations: [
    AppComponent,
    SearchAvailableBooksComponent,
    HomeComponent,
    PurchaseordersComponent,
    ReceiveordersComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    NgxBootstrapIconsModule,
    RouterModule.forRoot([
      
      { path:'books',component:SearchAvailableBooksComponent},
      { path:'home',component:HomeComponent},
      {path:'purchaseorders',component:PurchaseordersComponent},
      {path:'receiveorders',component:ReceiveordersComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'**',redirectTo:'home',pathMatch:'full'}
      
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
