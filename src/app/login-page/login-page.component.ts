import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  loginError = false;

  constructor(private formBuilder: FormBuilder,private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  getFormControl(controlName: string){
    return this.loginForm.get(controlName);
  }
  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    // Kiểm tra email và mật khẩu
    const user = this.userService.getUser();
    if (user && user.email === email && user.password === password) {
      this.toastr.success('Registration successful!', 'Success');
      this.router.navigate(['/list']);
    } else {
      // Xử lý đăng nhập không thành công
      this.loginError = true;
    }
  }
}