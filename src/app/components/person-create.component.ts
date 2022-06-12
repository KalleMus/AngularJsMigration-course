import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { ContactService } from "../services/contact.service";
import { Person } from "../types/person";

@Component({
  selector: "person-create",
  template:  require("./person-form.html").default
})
export class PersonCreateComponent {

  public person: Person = {} as Person;
  public mode: string = "Create";

  constructor(@Inject(ContactService) public contacts: ContactService, @Inject(Router) private router: Router) {
  }

  save(): void {
    this.contacts.createContact(this.person).then(() => {
      this.router.navigate([""]);
    });
  }

}
