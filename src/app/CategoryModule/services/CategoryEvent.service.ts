import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryPage } from '../types/Category';

@Injectable()
export class CategoryEvent {
  ClickEvent = new Subject<CategoryPage>();
}
