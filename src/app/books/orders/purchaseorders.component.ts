import { Component, OnInit } from '@angular/core';
import { BooksserviceService } from '../booksservice.service';
import { IPurchase } from './purchase';

@Component({
  selector: 'app-purchaseorders',
  templateUrl: './purchaseorders.component.html',
  styleUrls: ['./purchaseorders.component.css']
})
export class PurchaseordersComponent implements OnInit {

  purchasedBooks:IPurchase[]=[];
  constructor(private bookService:BooksserviceService) { }
  noItems:boolean=true;
  ngOnInit(): void {
    this.bookService.getPurchasedItems().subscribe((res)=>{
      this.purchasedBooks=res;
      if (res.length!=0) {
        this.noItems=false;
      }
     
    });
  }

}
