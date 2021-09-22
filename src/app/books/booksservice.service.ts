import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IBooks} from './books';

@Injectable({
  providedIn: 'root'
})
export class BooksserviceService {
  url:string="http://localhost:3000/IBooks"
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
}
