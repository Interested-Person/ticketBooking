
export interface User {
  uid: string;
  username: string;
  pfpUrl: string;
  isAdmin: boolean;
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