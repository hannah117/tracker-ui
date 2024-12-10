import { NgIf } from '@angular/common';
import { HttpClient, HttpHandler, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignupService } from './signup.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  imports: [MatFormField, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
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
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.required],
      'birthDate': [null, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.formGroup.value)
    // this.http.post('http://localhost:8081/habit-tracker/auth/signup', this.formGroup.value)
    // .subscribe(data => {console.log(data)});
    console.log(this.formGroup.value['email'])
    
    this.http.post('http://localhost:8081/habit-tracker/auth/signup', this.formGroup.value)
    .subscribe(data => {
      console.log(data)
      // this.token = (data as AuthToken).token; 
    })
    
    console.log(this.authService.token)
    this.formGroup.reset();


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