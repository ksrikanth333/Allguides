import { Component, Input, OnInit, Output } from '@angular/core';
import { IBooks } from './books';
import { BooksserviceService } from './booksservice.service';

@Component({
 // selector: 'app-search-available-books',
  templateUrl: './search-available-books.component.html',
  styleUrls: ['./search-available-books.component.css']
})
export class SearchAvailableBooksComponent implements OnInit {
  
    categories:string[]=["Education","Compititive Exam Books","Literature","IT Prgramming","Cloud Tehnology"];
    bookId:number=0;
    bookName:string='';
    bookCategory:string='';
    authorName:string='';
    sellerOrDonorName:string='';
    price:number=0.0;
    filteredBooks:IBooks[]=[];
    books:IBooks[]=[
    {
      "bookId": 1,
      "bookName": "Java",
      "bookCategory": "IT Programming",
      "authorName": "James",
      "sellerOrDonorName": "srikanth",
      "price": 120
    },
    {
      "bookId": 2,
      "bookName": "Dot Net",
      "bookCategory": "IT Programming",
      "authorName": "Vikram",
      "sellerOrDonorName": "ajay",
      "price": 340
    },
    {
      "bookId": 3,
      "bookName": "Digital Electronics",
      "bookCategory": "Educational",
      "authorName": "James",
      "sellerOrDonorName": "srikanth",
      "price": 460
    }
  ];
  newBook:IBooks|undefined;
  private _searchTerm:string='';
  constructor(private booksservice:BooksserviceService) {
  
   }
  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value:string){

    this._searchTerm=value;
  }
  ngOnInit(): void {
    //this.booksservice.getBooks().subscribe((res)=>this.books=res);
    this.filteredBooks=this.books;
  }
  search(){
    this.filteredBooks=this.books.filter(res=>res.bookName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    
  }
 
  sellBook(){
    
    const maxId=this.books.reduce((prev,curr)=>prev.bookId>curr.bookId?prev:curr).bookId;
    this.bookId=maxId+1;
    this.newBook={
      bookId:this.bookId,
      bookName:this.bookName,
      bookCategory:this.bookCategory,
      authorName:this.authorName,
      sellerOrDonorName:this.sellerOrDonorName,
      price:this.price
    }
    // this.booksservice.postBooks({
    //   bookId:this.bookId,
    //   bookName:this.bookName,
    //   bookCategory:this.bookCategory,
    //   authorName:this.authorName,
    //   sellerOrDonorName:this.sellerOrDonorName,
    //   price:this.price
    // }).subscribe(
    //   (data:IBooks)=>{console.log(data)}
    // )
     this.books.push(this.newBook);
     this.bookName='',this.bookCategory='',this.authorName='',this.price=0.0,this.sellerOrDonorName=''

  }

}
