import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoryClickedAction } from '../../store/category.actions';
import { CategoryPage } from '../../types/Category';
@Component({
  selector: 'category-elem-component',
  templateUrl: './category-elem.component.html',
  styleUrls: ['./category-elem.component.scss'],
})
export class CategoryElemComponent {
  constructor(private store: Store) {}
  @Input()
  Elem!: CategoryPage;
  Subscriptions = [];

  ngOnInit() {}

  CategoryClickEvent() {
    this.store.dispatch(
      CategoryClickedAction({
        data: {
          ShowSubTree:
            this.Elem.children.length > 0
              ? !this.Elem.categoryStore.ShowSubTree
              : this.Elem.categoryStore.ShowSubTree,
          categoryServer: this.Elem.categoryStore.categoryServer,
        },
      })
    );
  }
}
