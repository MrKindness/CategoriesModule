import { createAction, props } from '@ngrx/store';
import { CategoryServer, CategoryStore } from '../types/Category';

export const CategoriesPageOpenedAction = createAction(
  '[CATEGORIES] CategoriesPageOpenedAction'
);
export const CategoriesDownloadedAction = createAction(
  '[CATEGORIES] CategoriesDownloadedAction',
  props<{ data: CategoryServer[] }>()
);

export const CategoryChangeRequestAction = createAction(
  '[CATEGORIES] CategoryChangeRequestAction',
  props<{ data: CategoryStore }>()
);

export const CategoryChangedAction = createAction(
  '[CATEGORIES] CategoryChangedAction',
  props<{ data: CategoryStore }>()
);

export const CategoryClickedAction = createAction(
  '[CATEGORIES] CategoryClickedAction',
  props<{ data: CategoryStore | undefined }>()
);

export const CategoryAddRequestAction = createAction(
  '[CATEGORIES] CategoryAddRequestAction',
  props<{ data: CategoryServer }>()
);

export const CategoryAddedAction = createAction(
  '[CATEGORIES] CategoryAddedAction',
  props<{ data: CategoryStore }>()
);
