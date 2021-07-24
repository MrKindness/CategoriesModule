import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CategoryEvent } from '../../services/CategoryEvent.service';
import { Category } from '../../types/Category';
@Component({
  selector: 'category-component',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  constructor(private CategoryClick: CategoryEvent) {}
  @Input()
  Elem!: Category;
  ShowSubTree: boolean = false;
  ngOnInit() {
    console.log(this.Elem);
  }

  CategoryClickEvent() {
    this.ShowSubTree = !this.ShowSubTree;
    this.CategoryClick.ClickEvent.next(this.Elem);
  }
}
