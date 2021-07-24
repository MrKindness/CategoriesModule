import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CategoryEvent {
  ClickEvent = new Subject();
}
