import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IBooks } from './books';
import { BooksserviceService } from './booksservice.service';
import { IPurchase } from './orders/purchase';

@Component({
 // selector: 'app-search-available-books',
  templateUrl: './search-available-books.component.html',
  styleUrls: ['./search-available-books.component.css']
})
export class SearchAvailableBooksComponent implements OnInit {
   closeResult: string='';
   pDate:string='';
  
    categories:string[]=["Education","Compititive Exam Books","Literature","IT Programming","Cloud Tehnology"];
    

    //Edit
    editid:number=0;
    editbookName:string='';
    editbookCategory:string='';
    editauthorName:string='';
    editsellerOrDonorName:string='';
    editprice:number=0.0;
    editBook:any;
    //Edit
    //PurchaseBook
    purchaseid:number=0;
    transactionId:number=1;
    purchasebookName:string='';
    purchasebookCategory:string='';
    purchaseauthorName:string='';
    purchasesellerOrDonorName:string='';
    purchaseprice:number=0.0;
    purchaseBook:any;
    //purchaseBook
    prBooks:IPurchase[]=[];
    filteredBooks:IBooks[]=[];
    books:IBooks[]=[
    // {
    //   "bookId": 1,
    //   "bookName": "Java",
    //   "bookCategory": "IT Programming",
    //   "authorName": "James",
    //   "sellerOrDonorName": "srikanth",
    //   "price": 120
    // },
    // {
    //   "bookId": 2,
    //   "bookName": "Dot Net",
    //   "bookCategory": "IT Programming",
    //   "authorName": "Vikram",
    //   "sellerOrDonorName": "ajay",
    //   "price": 340
    // },
    // {
    //   "bookId": 3,
    //   "bookName": "Digital Electronics",
    //   "bookCategory": "Educational",
    //   "authorName": "James",
    //   "sellerOrDonorName": "srikanth",
    //   "price": 460
    // }
  ];
  
  private _searchTerm:string='';
  constructor(private booksservice:BooksserviceService,private modalService: NgbModal,private tsr:ToastrService) {
  
   }
  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value:string){

    this._searchTerm=value;
  }
  ngOnInit(): void {
    this.booksservice.getBooks().subscribe((res)=>{this.books=res;this.filteredBooks=this.books;});
    this.booksservice.getPurchasedItems().subscribe((res)=>this.prBooks=res);
    
  }
  search(){
    this.filteredBooks=this.books.filter(res=>res.bookName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    
  }
 
  

  deleteBook(id:number){
    if(confirm('Are sure you want to delete this item ?')){
      //put your delete method logic here
      this.booksservice.deleteBooks(id).subscribe((data)=>{this.ngOnInit()});
      this.deleteToastr();
     }
      // this.booksservice.deleteBooks(id).subscribe((data)=>{this.ngOnInit()});
    // this.books.forEach((value,index)=>{
    //   if (value.id==id) {
    //     this.books.splice(index,1);
    //   }
    // });
  }
  updateBookDetails(){
    this.editBook={
      id:this.editid,
      bookName:this.editbookName,
      bookCategory:this.editbookCategory,
      authorName:this.editauthorName,
      sellerOrDonorName:this.editsellerOrDonorName,
      price:this.editprice
    }
    
    this.booksservice.updateBookDetails(this.editBook).subscribe((data)=>{this.ngOnInit()});
    this.updateToastr();
  }
  buyBookDetails(){
    if(this.prBooks.length!=0){
      this.transactionId=this.prBooks.reduce((pr,cur)=>pr.id>cur.id?pr:cur).id+1
    }
    this.purchaseBook={
      id:this.transactionId,
      pDate:this.pDate,
      transactionId:this.purchaseid,
      bookName:this.purchasebookName,
      bookCategory:this.purchasebookCategory,
      authorName:this.purchaseauthorName,
      sellerOrDonorName:this.purchasesellerOrDonorName,
      price:this.purchaseprice
    }
    
    this.booksservice.purchaseBooks(this.purchaseBook).subscribe((data)=>{this.ngOnInit();this.buyToastr();this.pDate=''});
    console.log(this.pDate);
    
  }
  open(content:any,book:IBooks) {
    this.editid=book.id;this.editbookName=book.bookName;this.editbookCategory=book.bookCategory;
    this.editauthorName=book.authorName;this.editsellerOrDonorName=book.sellerOrDonorName;this.editprice=book.price;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }
  buyBook(content:any,book:IBooks){
    this.purchaseid=book.id;this.purchasebookName=book.bookName;this.purchasebookCategory=book.bookCategory;
    this.purchaseauthorName=book.authorName;this.purchasesellerOrDonorName=book.sellerOrDonorName;this.purchaseprice=book.price;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });

  }
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';

    } else {

      return  `with: ${reason}`;

    }

  }
  updateToastr(){
    this.modalService.dismissAll();
    this.tsr.success("Details Updated Successfully","Books",{timeOut:3000});
  } 
  buyToastr(){
    this.modalService.dismissAll();
    this.tsr.success("Purchase Completed Successfully","Books",{timeOut:3000});
  }  
  deleteToastr(){
    this.tsr.success("Item Deleted Successfully","Books",{timeOut:3000});
  }  

}
