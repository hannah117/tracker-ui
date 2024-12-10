import { Injectable } from '@angular/core';
import { Signuser } from '../models/signuser.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }


  url = 'http://localhost:8081/habit-tracker/auth/signup';

  // async postUser() : Promise<Signuser> {
  //   const data = await postMessage(this.url);
  //   return await data.json() ?? []
  // }
}
