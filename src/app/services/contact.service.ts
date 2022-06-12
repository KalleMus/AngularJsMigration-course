import { Inject, Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

import { Contact } from "./contact.resource";
import { Person } from "../types/person";

@Injectable()
export class ContactService {

  persons: Person[] = [];
  page: number = 1;
  search: string = "";
  sorting: string = "name";
  ordering: string = "ASC";

  hasMore: boolean = true;
  isLoading: boolean = false;
  isSaving: boolean = false;
  isDeleting: boolean = false;
  

  constructor(@Inject(Contact) private contact: Contact, @Inject(ToastrService) private toaster: ToastrService) {
    this.loadContacts();
  }
  
  getPerson(email: string): Person {
    console.log(email);
    for (let person of this.persons) {
      if (person.email === email) {
        return person;
      }
    }
  }

  doSearch(): void {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  doOrder(): void {
    this.hasMore = true;
    this.page = 1;
    this.persons = [];
    this.loadContacts();
  }

  loadContacts(): void {
    if (this.hasMore && !this.isLoading) {
      this.isLoading = true;

      var params = {
        _page: this.page.toString(),
        _sort: this.sorting,
        _order: this.ordering,
        q: this.search
      };

      this.contact.query(params).then((res: Array<Person>) => {
        console.log(res);
        for (let person of res) {
          this.persons.push(person);
        }

        if (res.length === 0) {
          this.hasMore = false;
        }

        this.isLoading = false;
      });
    }
  }
  
  loadMore(): void {
    if (this.hasMore && !this.isLoading) {
      this.page += 1;
      this.loadContacts();
    }
  }

  updateContact(person: Person): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isSaving = true;
      this.contact.update(person).then(() => {
        this.isSaving = false;
        this.toaster.success( "Updated " + person.name);
        resolve();
      });
    });
  }

  removeContact(person: Person): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isDeleting = true;
      this.contact.remove(person).then(() => {
        this.isDeleting = false;
        var index = this.persons.indexOf(person);
        this.persons.splice(index, 1);
        this.toaster.success( "Deleted " + person.name);
        resolve();
      });
    });
  }
  
  createContact(person: Person): Promise<void> {
    return new Promise((resolve, reject) => {
      this.isSaving = true;
      this.contact.save(person).then(() => {
        this.isSaving = false;
        this.hasMore = true;
        this.page = 1;
        this.persons = [];
        this.loadContacts();
        this.toaster.success("Created " + person.name);
        resolve();
      });
    });
  }

}