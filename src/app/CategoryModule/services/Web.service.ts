import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryServer } from '../types/Category';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WebService {
  url = 'http://localhost:3000/categories';

  constructor(private http: HttpClient) {}

  GetCategories() {
    return this.http.get(this.url);
  }

  UpdateCategory(category: CategoryServer): Observable<CategoryServer> {
    return this.http
      .put(this.url + '/' + category.id, category)
      .pipe(map((data) => data as CategoryServer));
  }

  AddCategory(category: CategoryServer): Observable<CategoryServer> {
    return this.http
      .post(this.url, category)
      .pipe(map((data) => data as CategoryServer));
  }

  DelCategory(category: CategoryServer) {
    return this.http.delete(this.url + '/' + category.id);
  }
}
