
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';

import { ContactService } from "../services/contact.service";

@Component({
  selector: "search",
  template: /*html*/ `
    <form class="navbar-form navbar-left" [formGroup]="form">
      <div class="form-group">
        <input type="text"
              class="form-control"
              id="name"
              placeholder="Search name..."
              formControlName="search"
        />
      </div>
      <div class="form-group">
        <select class="form-control" formControlName="sorting">
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div class="form-group">
        <select class="form-control" formControlName="ordering">
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>
    </form>
  `
})
export class SearchComponent implements OnInit {

  protected form: FormGroup;
  
  constructor(@Inject(ContactService) private contacts: ContactService) {
    this.form = new FormGroup({
      search: new FormControl(),
      sorting: new FormControl("name"),
      ordering: new FormControl("ASC")
    });
  }

  ngOnInit(): void {
    this.form
      .valueChanges
      .pipe(debounceTime(400), distinctUntilChanged(), tap(console.log))
      .subscribe(({sorting, ordering, search}) => {
        this.contacts.sorting = sorting;
        this.contacts.ordering = ordering;
        this.contacts.search = search;
        this.contacts.doSearch();
      });
  }

}
