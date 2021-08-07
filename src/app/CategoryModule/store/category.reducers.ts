import { createReducer, on } from '@ngrx/store';
import { CategoryStore } from '../types/Category';
import {
  CategoriesDownloadedAction,
  CategoryAddedAction,
  CategoryChangedAction,
  CategoryClickedAction,
} from './category.actions';

export interface CategoriesState {
  CategoriesList: CategoryStore[];
  ActiveCategory: CategoryStore | undefined;
}

const initialState: CategoriesState = {
  CategoriesList: [],
  ActiveCategory: undefined,
};

export const CategoriesReducer = createReducer(
  initialState,
  on(CategoriesDownloadedAction, (state, CategoriesList) => {
    return {
      ...state,
      CategoriesList: CategoriesList.data.map((elem) => ({
        categoryServer: elem,
        ShowSubTree: false,
      })),
    };
  }),
  on(CategoryChangedAction, (state, newObject) => {
    return {
      ...state,
      CategoriesList: state.CategoriesList.map((elem) =>
        elem.categoryServer.id === newObject.data.categoryServer.id
          ? newObject.data
          : elem
      ),
      ActiveCategory: newObject.data,
    };
  }),
  on(CategoryClickedAction, (state, ClickedElem) => {
    return {
      ...state,
      CategoriesList: state.CategoriesList.map((elem) =>
        ClickedElem.data !== undefined &&
        elem.categoryServer.id === ClickedElem.data.categoryServer.id
          ? ClickedElem.data
          : elem
      ),
      ActiveCategory: ClickedElem.data,
    };
  }),
  on(CategoryAddedAction, (state, newCategory) => {
    return {
      ...state,
      CategoriesList: [...state.CategoriesList, newCategory.data],
    };
  })
);
