import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryPageComponent } from './components/CategoryPage/category-page.component';
import { WebService } from './services/WebService';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CategoryComponent } from './components/Category/category.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatButtonModule],
  declarations: [CategoryPageComponent, CategoryComponent],
  providers: [WebService],
  exports: [CategoryPageComponent],
})
export class CategoryModule {}
