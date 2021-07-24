import { ActionReducerMap } from '@ngrx/store';
import { CategoriesState } from './category.reducers';
import { CategoriesReducer } from './category.reducers';

export interface State {
  Categories: CategoriesState;
}

export const CategoriesReducers: ActionReducerMap<State> = {
  Categories: CategoriesReducer,
};
