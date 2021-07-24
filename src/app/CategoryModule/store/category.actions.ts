import { createAction, props } from '@ngrx/store';
import { Category } from '../types/Category';

export const CategoriesPageOpenedAction = createAction(
  '[CATEGORIES] CategoryPageOpenedAction'
);
export const CategoryAddAction = createAction('[CATEGORIES] CategoryAddAction');
export const CategoriesDownloadedAction = createAction(
  '[CATEGORIES] CategoriesDownloadedAction',
  props<{ data: Category[] }>()
);

export const NewCategoryDownloadedAction = createAction(
  '[CATEGORIES] NewCategoryDownloadedAction'
);
