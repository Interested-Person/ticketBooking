
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
    totalCapacity:number;
    availableCapacity:number;
    imageURL:string;
    museumName:string;
    time:Date
    description:string;
    price:number;
    id:string;
}