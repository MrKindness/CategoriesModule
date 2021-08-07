import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { CategoryPage, CategoryStore } from '../../types/Category';
import { select, Store } from '@ngrx/store';
import {
  ActiveCategorySelector,
  CategoriesListSelector,
} from '../../store/category.selectors';
import {
  CategoriesPageOpenedAction,
  CategoryChangeRequestAction,
  CategoryClickedAction,
  DelCategoryRequest,
} from '../../store/category.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'category-page-component',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}
  TreeObject: any;
  Subscriptions: Subscription[] = [];
  Elem?: CategoryStore;
  ShowChangeCategoryForm: boolean = false;
  ShowNewCategoryForm: boolean = false;

  ngOnInit() {
    this.Subscriptions.push(
      this.store
        .pipe(
          select(CategoriesListSelector),
          filter((mass) => mass.length > 0),
          map((mass) => {
            let CopyMass: CategoryPage[] = [];
            for (let i = 0; i < mass.length; i++)
              CopyMass.push({ categoryStore: mass[i], children: [] });

            this.TreeObject = this.CreateTreeObject(CopyMass);
          })
        )
        .subscribe()
    );

    this.Subscriptions.push(
      this.store
        .pipe(
          select(ActiveCategorySelector),
          map((elem) => {
            this.ShowNewCategoryForm = false;
            this.ShowChangeCategoryForm = false;
            this.Elem = elem;
          })
        )
        .subscribe()
    );

    this.store.dispatch(CategoriesPageOpenedAction());
  }

  DeactivateCategory() {
    this.store.dispatch(CategoryClickedAction({ data: undefined }));
  }

  DelCategory() {
    this.store.dispatch(
      DelCategoryRequest({ data: this.Elem!.categoryServer })
    );
  }

  CreateTreeObject(mass: CategoryPage[]) {
    function SortFunction(first: CategoryPage, second: CategoryPage): number {
      return (
        second.categoryStore.categoryServer.order_number -
        first.categoryStore.categoryServer.order_number
      );
    }

    function CreateTreeObjectFirst(mass: CategoryPage[], parentIndex: number) {
      for (let i = 0; i < mass.length; i++) {
        if (
          mass[parentIndex].categoryStore.categoryServer.id ===
          mass[i].categoryStore.categoryServer.parent_id
        ) {
          mass[parentIndex].children?.push(mass[i]);
          CreateTreeObjectFirst(mass, i);
          mass[i].children.sort(SortFunction);
          mass.splice(i, 1);
          i--;
        }
      }
    }
    for (let k = 0; k < mass.length; k++) {
      CreateTreeObjectFirst(mass, k);
    }
    mass[0].children.sort(SortFunction);
    return mass;
  }

  ngOnDestroy() {
    for (let one of this.Subscriptions) one.unsubscribe();
  }
}
