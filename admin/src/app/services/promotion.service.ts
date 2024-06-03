import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { PromotionResDto } from '../dto/promotion/promotionResDto';
import { BASE_URL } from '../constant/api.constant';
import { InsertResDto } from '../dto/InsertResDto';
import { PromotionReqDto } from '../dto/promotion/promotionReqDto';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(private base: BaseService) {}

  createPromotion(body: PromotionReqDto): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/promotion`, body);
  }

  deletePromotion(id: string): Observable<InsertResDto> {
    return this.base.delete(`${BASE_URL}/promotion/?id=${id}`);
  }

  getAllPromotion(): Observable<PromotionResDto[]> {
    return this.base.get(`${BASE_URL}/promotion`);
  }

  sendEmail(data: any) {
    const { subject, title, description } = data;
    return this.base.get(
      `${BASE_URL}/promotion/email/?subject=${subject}&title=${title}&message=${description}`
    );
  }
}
