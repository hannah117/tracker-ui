import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



export interface AuthToken {
  token: string,
  expiresIn: number
}

export interface Login {
  email: String,
  password: String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
   }

  login: Login = {
    email: "",
    password: ""
  };

  public token: String
  getAuthToken(email: String, password: String) {
    this.login.email = email;
    this.login.password = password;
    console.log(this.login)
    console.log(email)
    console.log(password)
    this.http.post('http://localhost:8081/habit-tracker/auth/signup', {"email": email, "password": password})
    .subscribe(data => {console.log(data)});
    this.http.post('http://localhost:8081/habit-tracker/auth/login', {"email": email, "password": password})
    .subscribe(data => {
      console.log(data)
      // this.token = (data as AuthToken).token; 
    })

  }
}
