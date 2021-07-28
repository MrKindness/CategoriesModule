import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryEvent } from '../../services/CategoryEvent.service';
import { CategoryPage } from '../../types/Category';
@Component({
  selector: 'category-component',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(private CategoryClick: CategoryEvent) {}
  @Input()
  Elem!: CategoryPage;
  ngOnInit() {}

  CategoryClickEvent() {
    this.CategoryClick.ClickEvent.next(this.Elem);
  }
}
