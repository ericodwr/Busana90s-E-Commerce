import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private title: Title
  ) {
    this.title.setTitle('Dashboard Sendbylov');
  }

  loading = false;
  loginReqDto = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onLogin() {
    if (this.loginReqDto.valid) {
      this.loading = true;
      firstValueFrom(this.loginService.login(this.loginReqDto.getRawValue()))
        .then((res) => {
          this.loading = false;
          localStorage.setItem('data', JSON.stringify(res));
          this.router.navigateByUrl('/dashboard');
        })
        .catch((err) => console.log(err));
    }
  }
}
