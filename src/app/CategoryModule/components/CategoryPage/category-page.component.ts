import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { CategoryPage, CategoryStore } from '../../types/Category';
import { CategoryEvent } from '../../services/CategoryEvent.service';
import { select, Store } from '@ngrx/store';
import {
  ActiveCategorySelector,
  CategoriesListSelector,
} from '../../store/category.selectors';
import {
  CategoriesPageOpenedAction,
  CategoryChangeRequestAction,
  CategoryClickedAction,
} from '../../store/category.actions';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'category-page-component',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private CategoryEvent: CategoryEvent) {}
  TreeObject: any;
  Subscriptions: Subscription[] = [];
  Elem: CategoryStore | undefined;
  ShowForm: boolean = false;
  form!: FormGroup;

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
          distinctUntilChanged(),
          map((elem) => (this.Elem = elem))
        )
        .subscribe()
    );

    this.Subscriptions.push(
      this.CategoryEvent.ClickEvent.subscribe({
        next: (ClickedElem) => {
          this.store.dispatch(
            CategoryClickedAction({
              data: {
                ShowSubTree:
                  ClickedElem.children.length > 0
                    ? !ClickedElem.categoryStore.ShowSubTree
                    : ClickedElem.categoryStore.ShowSubTree,
                categoryServer: ClickedElem.categoryStore.categoryServer,
              },
            })
          );
        },
      })
    );

    this.form = new FormGroup({
      nameEn: new FormControl(''),
      nameRu: new FormControl(''),
      nameRo: new FormControl(''),
      order_number: new FormControl(0),
      is_blocked: new FormControl(false),
      is_visible: new FormControl(true),
    });

    this.store.dispatch(CategoriesPageOpenedAction());
  }

  DeactivateCategory() {
    this.store.dispatch(CategoryClickedAction({ data: undefined }));
  }

  VisibilityButtonClick() {
    this.store.dispatch(
      CategoryChangeRequestAction({
        data: {
          ShowSubTree: this.Elem!.ShowSubTree,
          categoryServer: {
            ...this.Elem!.categoryServer,
            is_visible: !this.Elem!.categoryServer.is_visible,
          },
        },
      })
    );
  }

  BlockButtonClick() {
    this.store.dispatch(
      CategoryChangeRequestAction({
        data: {
          ShowSubTree: this.Elem!.ShowSubTree,
          categoryServer: {
            ...this.Elem!.categoryServer,
            is_blocked: !this.Elem!.categoryServer.is_blocked,
          },
        },
      })
    );
  }

  Submit() {
    console.log(this.form);
  }

  DelCategory() {}

  CreateTreeObject(mass: CategoryPage[]) {
    function CreateTreeObjectFirst(mass: CategoryPage[], parentIndex: number) {
      for (let i = 0; i < mass.length; i++) {
        if (
          mass[parentIndex].categoryStore.categoryServer.id ===
          mass[i].categoryStore.categoryServer.parent_id
        ) {
          mass[parentIndex].children?.push(mass[i]);
          CreateTreeObjectFirst(mass, i);
          mass[i].children.sort(
            (first, second) =>
              first.categoryStore.categoryServer.order_number -
              second.categoryStore.categoryServer.order_number
          );
          mass.splice(i, 1);
          i--;
        }
      }
    }
    for (let k = 0; k < mass.length; k++) {
      CreateTreeObjectFirst(mass, k);
    }
    mass[0].children.sort(
      (first, second) =>
        first.categoryStore.categoryServer.order_number -
        second.categoryStore.categoryServer.order_number
    );
    return mass;
  }

  ngOnDestroy() {
    for (let one of this.Subscriptions) one.unsubscribe();
  }
}
