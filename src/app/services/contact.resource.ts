import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";

import { Person } from "../types/person";

@Injectable()
export class Contact {

  private apiRoot: string = "http://localhost:3000/contacts";
  
  constructor(@Inject(HttpClient) private http: HttpClient) {
  }

  query(params: { [key: string]: string }): Promise<Array<Person>> {
    return this.http.get<Array<any>>(this.apiRoot, { params }).toPromise();
  }

  get(id: string, params?: { [key: string]: string }): Promise<Person> {
    return this.http.get<Person>(this.apiRoot + "/" + id, { params }).toPromise();
  }

  save(person: Person): Promise<void> {
    return this.http.post<void>(this.apiRoot, person).toPromise();
  }

  update(person: Person): Promise<void> {
    return this.http.put<void>(this.apiRoot + "/" + person.id, person).toPromise();
  }

  remove(person: Person): Promise<void> {
    return this.http.delete<void>(this.apiRoot + "/" + person.id).toPromise();
  }

}
