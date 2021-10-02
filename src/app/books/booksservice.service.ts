import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IBooks} from './books';
import { IPurchase } from './orders/purchase';

@Injectable({
  providedIn: 'root'
})
export class BooksserviceService {
  url:string="http://localhost:3000/IBooks"
  purchaseUrl:string="http://localhost:3000/IPurchase";
  constructor(private http:HttpClient) { }
  getBooks(){
    return this.http.get<IBooks[]>(this.url);
  }
  postBooks(book:IBooks):Observable<IBooks>{
    return this.http.post<IBooks>(this.url,book,{
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
