import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { BASE_URL_IMG } from 'src/app/constant/api.constant';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'list-banner',
  templateUrl: './list-banner.component.html',
})
export class ListBannerComponent implements OnInit {
  constructor(
    private bannerService: BannerService,
    private fb: NonNullableFormBuilder
  ) {}

  // Variables
  banners: any = [];
  visible = false;
  updateVisible = false;
  url = BASE_URL_IMG;
  bannerId: string = '';
  updateForm = this.fb.group({
    isActive: false,
    id: '',
  });

  getData() {
    firstValueFrom(this.bannerService.getAll())
      .then((res) => {
        this.banners = res;
      })
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
    this.getData();
  }

  getSeverity(status: boolean) {
    switch (status) {
      case true:
        return 'success';
      case false:
        return 'warning';
    }
  }

  // Delete Banner Functions
  onDeleteModal(id: string) {
    if (id) {
      this.bannerId = id;
      this.visible = true;
    }
  }

  deleteModal() {
    if (this.bannerId) {
      firstValueFrom(this.bannerService.removeBanner(this.bannerId))
        .then((res) => {
          this.visible = false;
          this.bannerId = '';
          this.getData();
        })
        .catch((err) => console.log(err));
    }
  }

  // Update Banner Functions
  onUpdateModal(id: string, isActive: boolean) {
    if (id) {
      this.updateForm.controls['id'].setValue(id);
      this.updateForm.controls['isActive'].setValue(isActive);
      this.updateVisible = true;
    }
  }

  updateModal() {
    if (this.updateForm.valid) {
      firstValueFrom(
        this.bannerService.editStatusBanner(this.updateForm.getRawValue())
      )
        .then((res) => {
          this.updateForm.reset();
          this.updateVisible = false;
          this.getData();
        })
        .catch((err) => console.log(err));
    }
  }
}
