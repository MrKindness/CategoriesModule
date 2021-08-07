import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  CategoryAddRequestAction,
  CategoryChangeRequestAction,
} from '../../store/category.actions';
import { CategoryStore } from '../../types/Category';

@Component({
  selector: 'category-form-component',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Input()
  SelectedElem?: CategoryStore;
  @Input()
  ParentElem!: CategoryStore;
  form!: FormGroup;
  valids = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nameEn: new FormControl(
        this.SelectedElem === undefined
          ? ''
          : this.SelectedElem.categoryServer.name.EN,
        this.valids
      ),
      nameRu: new FormControl(
        this.SelectedElem === undefined
          ? ''
          : this.SelectedElem.categoryServer.name.RU,
        this.valids
      ),
      nameRo: new FormControl(
        this.SelectedElem === undefined
          ? ''
          : this.SelectedElem.categoryServer.name.RO,
        this.valids
      ),
      order_number: new FormControl(
        this.SelectedElem === undefined
          ? 0
          : this.SelectedElem.categoryServer.order_number
      ),
      is_blocked: new FormControl(
        this.SelectedElem === undefined
          ? false
          : this.SelectedElem.categoryServer.is_blocked
      ),
      is_visible: new FormControl(
        this.SelectedElem === undefined
          ? true
          : this.SelectedElem.categoryServer.is_visible
      ),
    });
  }

  Submit() {
    if (this.SelectedElem === undefined)
      this.store.dispatch(
        CategoryAddRequestAction({
          data: {
            child_type: 1,
            is_blocked: this.form.value.is_blocked,
            is_visible: this.form.value.is_visible,
            name: {
              EN: this.form.value.nameEn,
              RO: this.form.value.nameRo,
              RU: this.form.value.nameRu,
            },
            order_number: this.form.value.order_number,
            parent_id: this.ParentElem.categoryServer.id!,
            type: 0,
            photo: '',
          },
        })
      );
    else
      this.store.dispatch(
        CategoryChangeRequestAction({
          data: {
            ShowSubTree: this.SelectedElem.ShowSubTree,
            categoryServer: {
              ...this.SelectedElem.categoryServer,
              name: {
                EN: this.form.value.nameEn,
                RO: this.form.value.nameRo,
                RU: this.form.value.nameRu,
              },
              is_blocked: this.form.value.is_blocked,
              is_visible: this.form.value.is_visible,
              order_number: this.form.value.order_number,
            },
          },
        })
      );
  }
}
