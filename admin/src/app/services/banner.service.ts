import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BASE_URL } from '../constant/api.constant';
import { Observable } from 'rxjs';
import { InsertResDto } from '../dto/InsertResDto';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private base: BaseService) {}

  createBanner(body: any): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/banner`, body);
  }

  removeBanner(id: string): Observable<InsertResDto> {
    return this.base.delete(`${BASE_URL}/banner/?id=${id}`);
  }

  editStatusBanner(body: any): Observable<InsertResDto> {
    return this.base.patch(`${BASE_URL}/banner/`, body);
  }

  getAll() {
    return this.base.get(`${BASE_URL}/banner`);
  }
}
