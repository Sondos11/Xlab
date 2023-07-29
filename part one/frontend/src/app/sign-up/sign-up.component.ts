import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formGroup: any;
  // registrationForm: FormGroup = new FormGroup({});
  name: string = '';
  mobile: string = '';
  email: string = '';
  image: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient) {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(11),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.matchPassword.bind(this),
      ]),
    });
  }
  matchPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
  ngOnInit(): void {}

  register() {
    let bodyData = {
      name: this.name,
      mobile: this.mobile,
      email: this.email,
      image: this.image,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
    this.http
      .post('http://localhost:8086/user/create', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Registered Successfully');

        this.name = '';
        this.mobile = '';
        this.email = '';
        this.image = '';
        this.password = '';
        this.confirmPassword = '';
      });
  }
}
