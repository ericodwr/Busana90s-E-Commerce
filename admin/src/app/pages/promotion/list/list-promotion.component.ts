import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PromotionResDto } from 'src/app/dto/promotion/promotionResDto';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'list-promotion',
  templateUrl: './list-promotion.component.html',
})
export class ListPromotionComponent implements OnInit {
  loading: boolean = false;

  constructor(private promotionService: PromotionService) {}

  getData() {
    firstValueFrom(this.promotionService.getAllPromotion())
      .then((res) => {
        this.promotions = res;
      })
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
    this.getData();
  }

  // Variables
  promotions: PromotionResDto[] = [];
  visible: boolean = false;
  id: string = '';

  // Functions
  onDeleteModal(id: string) {
    this.visible = true;
    this.id = id;
  }

  deleteModal() {
    if (this.id) {
      firstValueFrom(this.promotionService.deletePromotion(this.id))
        .then((res) => {
          this.id = '';
          this.getData();
          this.visible = false;
        })
        .catch((err) => console.log(err));
    }
  }

  sendEmail(promotion: any) {
    this.loading = true;
    firstValueFrom(this.promotionService.sendEmail(promotion))
      .then((res) => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }
}
