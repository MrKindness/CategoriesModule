import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from '../../types/Category';
import { CategoryService } from '../../services/CategoryClick.service';
import { WebService } from '../../services/Web.service';

@Component({
  selector: 'category-page-component',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  constructor(
    private web: WebService,
    private CategoryEvent: CategoryService
  ) {}
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

    this.CategoryEvent.ClickEvent.subscribe({
      next: (id) => {
        console.log(id);
      },
    });
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
