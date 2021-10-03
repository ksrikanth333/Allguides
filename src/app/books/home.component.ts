import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { IBooks } from './books';
import { BooksserviceService } from './booksservice.service';
import { ISalesBooks } from './orders/salesbooks';

@Component({
 // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   sDate:string='';
   formValid:any;

  closeResult: string='';

    id:number=1;
    transactionId:number=1;
    bookName:string='';
    bookCategory:string='';
    authorName:string='';
    sellerOrDonorName:string='';
    price:number=0.0;
    newBook:IBooks|undefined;
    salesBook:ISalesBooks|undefined;
    books:IBooks[]=[];
    salesBooks:ISalesBooks[]=[];
    categories:string[]=["Education","Compititive Exam Books","Literature","IT Programming","Cloud Tehnology"];
  constructor(private booksservice:BooksserviceService,private tsr:ToastrService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.booksservice.getBooks().subscribe((res)=>{this.books=res;});
    this.booksservice.getSalesBooks().subscribe((res)=>{this.salesBooks=res})
  }
  sellBook(){
    
    console.log(this.formValid)
    if (this.formValid==true) {
       if (this.books.length!=0) {
        const maxId=this.books.reduce((prev,curr)=>prev.id>curr.id?prev:curr).id;
        this.id=maxId+1;
       } 
      
      if (this.salesBooks.length!=0) {
        this.transactionId=this.salesBooks.reduce((pre,curr)=>pre.id>curr.id?pre:curr).id+1;
      }
     
      this.newBook={
        id:this.id,
        bookName:this.bookName,
        bookCategory:this.bookCategory,
        authorName:this.authorName,
        sellerOrDonorName:this.sellerOrDonorName,
        price:this.price
      }
      this.salesBook={
        id:this.transactionId,
        sDate:this.sDate,
        transactionId:this.id,
        bookName:this.bookName,
        bookCategory:this.bookCategory,
        authorName:this.authorName,
        sellerOrDonorName:this.sellerOrDonorName,
        price:this.price
      }
      console.log(this.sDate);
      this.booksservice.postBooks(this.newBook).subscribe(
        (data:IBooks)=>{
          this.books.push(data);
          this.saveToastr();
        }
      )
      this.booksservice.postSalesBooks(this.salesBook).subscribe(
        (data:ISalesBooks)=>{
          this.salesBooks.push(data);
          this.sDate='';
         // this.saveToastr();
        }
      )
      // this.books.push(this.newBook);
       //this.bookName='',this.bookCategory='',this.authorName='',this.price=0.0,this.sellerOrDonorName=''
    }
   

  }
  saveToastr(){
    this.modalService.dismissAll();
    this.tsr.success("Transaction Completed Successfully","Books",{timeOut:3000});
  }
  onSubmit(form:NgForm){
    this.formValid=form.valid;
    console.log("ngform",this.formValid)
    this.sellBook();
  }
  openNewBook(content:any) {
    this.bookName='',this.bookCategory='',this.authorName='',this.price=0.0,this.sellerOrDonorName=''

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
  
}
