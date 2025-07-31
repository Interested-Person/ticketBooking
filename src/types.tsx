
export interface User {
  uid: string;
  username: string;
  pfpUrl: string;
  age: number;
  gender: string;
  tags: string[];
}
export interface Event{
    name:string;
    totalSeats:number;
    availableSeats:number;
    imageURL:string;
    TheatreName:string;
    time:Date
    description:string;
    price:number;
    id:string;
}