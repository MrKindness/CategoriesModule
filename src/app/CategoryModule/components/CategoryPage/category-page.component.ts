import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from '../../types/Category';
import { CategoryEvent } from '../../services/CategoryEvent.service';
import { WebService } from '../../services/Web.service';
import { select, Store } from '@ngrx/store';
import { CategoriesListSelector } from '../../store/category.selectors';
import { CategoriesPageOpenedAction } from '../../store/category.actions';

@Component({
  selector: 'category-page-component',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  constructor(private store: Store, private CategoryEvent: CategoryEvent) {}
  TreeObject: any;

  ngOnInit() {
    this.store.pipe(select(CategoriesListSelector));
    this.CategoryEvent.ClickEvent.subscribe({
      next: (ClickElem) => {
        console.log(ClickElem);
      },
    });
    this.store.dispatch(CategoriesPageOpenedAction());
  }

  CreateCategoryClick() {}

  CreateTreeObject(mass: Category[]) {
    function CreateTreeObjectFirst(mass: Category[], parentIndex: number) {
      for (let i = 0; i < mass.length; i++) {
        if (mass[parentIndex].id === mass[i].parent_id) {
          mass[parentIndex].children?.push(mass[i]);
          CreateTreeObjectFirst(mass, i);
          mass.splice(i, 1);
          i--;
        }
      }
    }

    for (let k = 0; k < mass.length; k++) CreateTreeObjectFirst(mass, k);
    return mass;
  }
}
