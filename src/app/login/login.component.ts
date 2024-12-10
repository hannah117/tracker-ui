
import { NgIf } from '@angular/common';
import { HttpClient, HttpHandler, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService, AuthToken } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  imports: [MatFormField, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup: FormGroup;
  useremail: String;
  password: String;
  


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {   }

  log(value: any) {
    console.log(value)
  }


  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({

      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.formGroup.value)
    // this.http.post('http://localhost:8081/habit-tracker/auth/signup', this.formGroup.value)
    // .subscribe(data => {console.log(data)});
    const email = this.formGroup.value['email']
    const password = this.formGroup.value['password']

    
    this.http.post('http://localhost:8081/habit-tracker/auth/login', this.formGroup.value)
    .subscribe(data => {
      console.log(data)
      // this.token = (data as AuthToken).token; 
      window.localStorage.setItem("token", (data as AuthToken).token);
      window.localStorage.setItem("email",email);
      window.localStorage.setItem("password", password);
    });

    this.formGroup.reset();

    this.getUserIdInitial();

  }

  getWindow() {
    return (typeof window !== "undefined" ? window : ({} as Window))
  }

  setUserId(userId: string) {
    if (typeof window !== "undefined") {
     this.getWindow().localStorage.setItem("userId", userId)
     }
  }

  getEmail() {
    if (typeof window !== "undefined") {
     return this.getWindow().localStorage.getItem("email")
    }
    return ""
  }

  getUserIdInitial() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ window.localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*"
    });
    this.http.get('http://localhost:8081/habit-tracker/user/user/email/' + this.getEmail(), {headers})
    .subscribe(data => {

      return this.setUserId((data as User).id.toString())
    })
  
  }

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email
  // ]);


  // firstNameFormControl = new FormControl('', [
  //   Validators.required
  // ]);

  
  // lastNameFormControl = new FormControl('', [
  //   Validators.required
  // ]);

  // birthDateFormControl  = new FormControl('', [
  //   Validators.required  ]);
}