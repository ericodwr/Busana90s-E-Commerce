import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { BroadcastResDto } from '../dto/broadcast/broadcastResDto';
import { BASE_URL } from '../constant/api.constant';
import { InsertResDto } from '../dto/InsertResDto';
import { BroadcastReqDto } from '../dto/broadcast/broadcastReqDto';

@Injectable({
  providedIn: 'root',
})
export class BroadcastService {
  constructor(private base: BaseService) {}

  createBroadcast(body: BroadcastReqDto): Observable<InsertResDto> {
    return this.base.post(`${BASE_URL}/broadcast`, body);
  }

  deleteBroadcast(id: string): Observable<InsertResDto> {
    return this.base.delete(`${BASE_URL}/broadcast/?id=${id}`);
  }

  getAllBroadcast(): Observable<BroadcastResDto[]> {
    return this.base.get(`${BASE_URL}/broadcast`);
  }

  sendEmail(data: any) {
    const { subject, title, description } = data;
    return this.base.get(
      `${BASE_URL}/broadcast/email/?subject=${subject}&title=${title}&message=${description}`
    );
  }
}
