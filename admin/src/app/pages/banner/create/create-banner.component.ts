import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BannerService } from 'src/app/services/banner.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'create-banner',
  templateUrl: './create-banner.component.html',
})
export class CreateBannerComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private bannerService: BannerService,
    private authService: AuthService,
    private router: Router
  ) {}

  testForm = this.fb.group({
    title: ['', Validators.required],
    status: [true, Validators.required],
  });

  adminId = '';
  isValid = true;
  uploadedFile: any[] = [];

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    this.formData.append('adminId', profile?.id ? profile.id : '');
  }
  formData = new FormData();

  files: any = '';

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFile.push(file);
      this.formData.append('file', file);
      this.files = event.files[0];
    }
    this.isValid = false;
  }

  onSubmit() {
    this.formData.append('title', this.testForm.getRawValue().title);
    this.formData.append(
      'isActive',
      this.testForm.getRawValue().status ? '1' : '0'
    );

    firstValueFrom(this.bannerService.createBanner(this.formData))
      .then((res) => {
        this.testForm.reset();
        this.router.navigateByUrl('/banners');
      })
      .catch((err) => console.log(err));
  }
}
