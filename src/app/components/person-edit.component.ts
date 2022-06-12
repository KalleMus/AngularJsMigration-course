import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactService } from "../services/contact.service";
import { Person } from "../types/person";


@Component({
  selector: "person-edit",
  template: require("./person-form.html").default
})
export class PersonEditComponent implements OnInit {
  
  person: Person;
  public mode: string = "Edit";
  
  constructor(@Inject(ContactService)  private contacts: ContactService, @Inject(ActivatedRoute) private route: ActivatedRoute, @Inject(Router) private router: Router) {
 
  }

  ngOnInit(): void {
    console.log("this.route", this.route);
    
    this.route.params.subscribe(params => {
      console.log("params", params);
      if (params["email"]) {
        this.person = this.contacts.getPerson(params["email"]);
      }
    });

  }


  save(): void {
    this.contacts.updateContact(this.person).then(() => {
      this.router.navigate([""]);
    });
  }

  remove(): void {
    this.contacts.removeContact(this.person).then(() => {
      this.router.navigate([""]);
    });
  }
}

