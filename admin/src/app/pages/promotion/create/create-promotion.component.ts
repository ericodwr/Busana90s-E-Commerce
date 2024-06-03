import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'create-promotion',
  templateUrl: './create-promotion.component.html',
})
export class CreatePromotionComponent implements OnInit {
  ngOnInit(): void {
    const profile = this.authService.getProfile();
    this.adminId = profile?.id ? profile.id : '';
    this.createForm.controls['adminId'].setValue(this.adminId);
    console.log(this.adminId);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private promotionService: PromotionService,
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
        this.promotionService.createPromotion(this.createForm.getRawValue())
      )
        .then((res) => {
          this.createForm.reset();
          this.router.navigateByUrl('/promotions');
        })
        .catch((err) => console.log(err));
    }
  }
}
