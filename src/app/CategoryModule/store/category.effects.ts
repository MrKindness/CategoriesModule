import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import {
  CategoriesDownloadedAction,
  CategoriesPageOpenedAction,
  CategoryAddedAction,
  CategoryAddRequestAction,
  CategoryChangedAction,
  CategoryChangeRequestAction,
} from 'src/app/CategoryModule/store/category.actions';
import { WebService } from '../services/Web.service';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private WebService: WebService) {}

  CategoriesPageOpenedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesPageOpenedAction),
      switchMap(() => {
        return this.WebService.GetCategories().pipe(
          map((mass: any) => {
            console.log(mass);
            return CategoriesDownloadedAction({ data: mass });
          })
        );
      })
    )
  );
  CategoryChangedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryChangeRequestAction),
      switchMap((CategoryData) => {
        return this.WebService.UpdateCategory(
          CategoryData.data.categoryServer
        ).pipe(
          map((response) => {
            console.log(response);
            return CategoryChangedAction({
              data: {
                ShowSubTree: CategoryData.data.ShowSubTree,
                categoryServer: response,
              },
            });
          })
        );
      })
    )
  );

  CategoryAddEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryAddRequestAction),
      switchMap((CategoryData) => {
        return this.WebService.AddCategory(CategoryData.data).pipe(
          map((response) => {
            console.log(response);
            return CategoryAddedAction({
              data: { ShowSubTree: false, categoryServer: response },
            });
          })
        );
      })
    )
  );
}
