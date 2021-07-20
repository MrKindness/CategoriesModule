import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryPageComponent } from './components/CategoryPage/category-page.component';
import { WebService } from './services/Web.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { CategoryComponent } from './components/Category/category.component';
import { CategoryService } from './services/CategoryClick.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatButtonModule],
  declarations: [CategoryPageComponent, CategoryComponent],
  providers: [WebService, CategoryService],
  exports: [CategoryPageComponent],
})
export class CategoryModule {}
