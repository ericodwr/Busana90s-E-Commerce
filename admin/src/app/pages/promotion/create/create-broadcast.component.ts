import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BroadcastService } from 'src/app/services/broadcast.service';

@Component({
  selector: 'create-promotion',
  templateUrl: './create-broadcast.component.html',
})
export class CreateBroadcastComponent implements OnInit {
  ngOnInit(): void {
    const profile = this.authService.getProfile();
    this.adminId = profile?.id ? profile.id : '';
    this.createForm.controls['adminId'].setValue(this.adminId);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private broadcastService: BroadcastService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Variables
  createForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    subject: ['', Validators.required],
    adminId: ['', Validators.required],
  });
  adminId: string = '';

  // Functions
  onSubmit() {
    if (this.createForm.valid) {
      firstValueFrom(
        this.broadcastService.createBroadcast(this.createForm.getRawValue())
      )
        .then((res) => {
          this.createForm.reset();
          this.router.navigateByUrl('/broadcasts');
        })
        .catch((err) => console.log(err));
    }
  }
}
