import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesState } from './category.reducers';

const featureSelector = createFeatureSelector<CategoriesState>('Categories');

export const CategoriesListSelector = createSelector(
  featureSelector,
  (state) => {
    return state.CategoriesList;
  }
);
