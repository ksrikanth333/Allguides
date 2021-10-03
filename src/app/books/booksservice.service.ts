import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IBooks} from './books';
import { IPurchase } from './orders/purchase';
import { ISalesBooks } from './orders/salesbooks';

@Injectable({
  providedIn: 'root'
})
export class BooksserviceService {
  url:string="http://localhost:3000/IBooks"
  purchaseUrl:string="http://localhost:3000/IPurchase";
  salesBooksUrl:string="http://localhost:3000/ISalesBooks";

  constructor(private http:HttpClient) { }
  getBooks(){
    return this.http.get<IBooks[]>(this.url);
  }
  getPurchasedItems():Observable<IPurchase[]>{
    return this.http.get<IPurchase[]>(this.purchaseUrl);
  }
  getSalesBooks():Observable<ISalesBooks[]>{
    return this.http.get<ISalesBooks[]>(this.salesBooksUrl);
  }
  postBooks(book:IBooks):Observable<IBooks>{
    return this.http.post<IBooks>(this.url,book,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
  postSalesBooks(book:ISalesBooks):Observable<ISalesBooks>{
    return this.http.post<ISalesBooks>(this.salesBooksUrl,book,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
  purchaseBooks(purchasedBook:IPurchase):Observable<IPurchase>{
    return this.http.post<IPurchase>(this.purchaseUrl,purchasedBook,{
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
  deleteBooks(id:number):Observable<IBooks>{
    return this.http.delete<IBooks>(this.url+'/'+id);
  }
  updateBookDetails(book:IBooks):Observable<IBooks>{
    return this.http.put<IBooks>(this.url+'/'+book.id,book);
    
  }
}
