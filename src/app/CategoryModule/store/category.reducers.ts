import { createReducer } from '@ngrx/store';
import { Category } from '../types/Category';

export interface CategoriesState {
  CategoriesList: Category[];
}

const initialState: CategoriesState = {
  CategoriesList: [],
};

export const CategoriesReducer = createReducer(initialState);
