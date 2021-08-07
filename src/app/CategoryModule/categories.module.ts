import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryPageComponent } from './components/CategoryPage/category-page.component';
import { WebService } from './services/Web.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CategoryElemComponent } from './components/CategoryElem/category-elem.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './store/category.effects';
import { CategoriesReducer } from './store/category.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './components/CategoryForm/category-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    StoreModule.forFeature('Categories', CategoriesReducer),
    EffectsModule.forFeature([CategoriesEffects]),
  ],
  declarations: [
    CategoryPageComponent,
    CategoryElemComponent,
    CategoryFormComponent,
  ],
  providers: [WebService],
  exports: [CategoryPageComponent],
})
export class CategoryModule {}
