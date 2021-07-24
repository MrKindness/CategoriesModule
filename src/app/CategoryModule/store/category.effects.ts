import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import {
  CategoriesDownloadedAction,
  CategoriesPageOpenedAction,
} from 'src/app/CategoryModule/store/category.actions';
import { WebService } from '../services/Web.service';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private WebService: WebService) {}

  CategoriesPageOpenedEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesPageOpenedAction),
      switchMap(() => {
        return this.WebService.getCategories().pipe(
          map((mass: any) => {
            console.log(mass);
            return CategoriesDownloadedAction({ data: mass });
          })
        );
      })
    )
  );
  CategoryAddEffect$ = createEffect(() => this.actions$.pipe());
}
