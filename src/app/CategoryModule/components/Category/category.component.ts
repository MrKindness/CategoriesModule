import { Component, Input } from '@angular/core';
import { Category } from '../../types/Category';
@Component({
  selector: 'category-component',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  @Input()
  Elem!: Category;

  ngOnInit() {
    console.log(this.Elem);
  }
}
