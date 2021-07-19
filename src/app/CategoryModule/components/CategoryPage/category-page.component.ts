import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/WebService';
import { map } from 'rxjs/operators';
import { CategoryComponent } from '../Category/category.component';
import { Category } from '../../types/Category';

@Component({
  selector: 'category-page-component',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  constructor(private web: WebService) {}
  CategoryElem = CategoryComponent;
  ShowCategoryTree = true;
  TreeObject: any;

  ngOnInit() {
    this.web
      .getCategories()
      .pipe(
        map((response) => {
          (response as Category[]).map((elem) => {
            elem.children = [];
          });
          this.TreeObject = this.CreateTreeObject(response as Category[]);
        })
      )
      .subscribe();
  }

  NewCategory() {
    this.ShowCategoryTree = !this.ShowCategoryTree;
  }

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
