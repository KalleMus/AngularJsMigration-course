
import { Component, Inject } from "@angular/core";

import { ContactService } from "../services/contact.service";

@Component({
  selector: "person-list",
  template: /*html*/ `
    <div class="col-md-12">
      <div class="row"
          infiniteScroll
          [infiniteScrollDistance]="2"
          [immediateCheck]="false"
          [infiniteScrollThrottle]="100"
          (scrolled)="contacts.loadMore()">

        <cc-card *ngFor="let person of contacts.persons"
          [user]="person">
        </cc-card>
      
      </div>
      <div *ngIf="contacts.persons.length == 0 && !contacts.isLoading">
        <div class="alert alert-info">
          <p class="text-center">No results found for search term '{{ contacts.search }}'</p>
        </div>
      </div>
      <cc-spinner [isLoading]="contacts.isLoading" [message]="'Loading...'"></cc-spinner>
    </div>
  `
})
export class PersonListComponent {

  constructor(@Inject(ContactService) public contacts: ContactService) {
  
  }
}

