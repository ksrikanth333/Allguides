import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:` <nav class="navbar navbar-light bg-primary" >
  <div class="container-fluid" >
  
      <a class="navbar-brand" style="color: white;">Book Donation Management App</a>
      <ul class="nav nav-pills">
          <li><a class="nav-link" [routerLink]="['/home']" style="color: white;">Home</a></li>
          <li><a class="nav-link" [routerLink]="['/books']" style="color: white;">Books</a></li>
      </ul>
      <div class="d-flex">
          <button class="btn btn-success">Donate Or Sell</button>
      </div>
  </div>
 </nav>
 <div >
   <router-outlet></router-outlet>

 </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AllGuides';
}
