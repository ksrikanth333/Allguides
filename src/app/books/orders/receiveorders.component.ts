import { Component, OnInit } from '@angular/core';
import { BooksserviceService } from '../booksservice.service';
import { ISalesBooks } from './salesbooks';

@Component({
  selector: 'app-receiveorders',
  templateUrl: './receiveorders.component.html',
  styleUrls: ['./receiveorders.component.css']
})
export class ReceiveordersComponent implements OnInit {

  salesBooks:ISalesBooks[]=[];
  constructor(private bookService:BooksserviceService) { }
  noItems:boolean=true;
  ngOnInit(): void {
    this.bookService.getSalesBooks().subscribe((res)=>{
      this.salesBooks=res;
      if (res.length!=0) {
        this.noItems=false;
      }
      

    });
  }

}
