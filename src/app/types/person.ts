/*

$$hashKey: "object:13"
address: "19729 Jamarcus Views"
birthdate: "1995-07-18T15:19:44.012503Z"
city: "Aufderharberg"
country: "Scotland"
createdTs: "2016-12-19T19:43:25.012978Z"
email: "nels.johns@verlie.com"
favorite: false
id: 685
name: "Emmie Sporer"
phonenumber: "(1001)159-76210"
photo: "https://randomuser.me/api/portraits/men/28.jpg"
sex: "M"
updatedTs: "2016-12-19T19:43:25.013017Z"

*/
export interface Person {
  address: string;
  birthdate: string;
  city: string;
  country: string;
  createdTs: string;
  email: string;
  favorite: boolean;
  id: number;
  name: string;
  phonenumber: string;
  photo: string;
  sex: string;
  updatedTs: string;
}