import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../types/Category';
import { Observable } from 'rxjs';

@Injectable()
export class WebService {
  url = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(this.url);
  }

  postCategory(category: Category) {
    return this.http.post(this.url, category);
  }
}
