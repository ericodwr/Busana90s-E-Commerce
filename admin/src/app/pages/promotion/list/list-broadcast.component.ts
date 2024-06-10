import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BroadcastResDto } from 'src/app/dto/broadcast/broadcastResDto';
import { BroadcastService } from 'src/app/services/broadcast.service';

@Component({
  selector: 'list-broadcast',
  templateUrl: './list-broadcast.component.html',
})
export class ListBroadcastComponent implements OnInit {
  loading: boolean = false;

  constructor(private broadcastService: BroadcastService) {}

  getData() {
    firstValueFrom(this.broadcastService.getAllBroadcast())
      .then((res) => {
        this.broadcasts = res;
      })
      .catch((err) => console.log(err));
  }

  ngOnInit(): void {
    this.getData();
  }

  // Variables
  broadcasts: BroadcastResDto[] = [];
  visible: boolean = false;
  id: string = '';

  // Functions
  onDeleteModal(id: string) {
    this.visible = true;
    this.id = id;
  }

  deleteModal() {
    if (this.id) {
      firstValueFrom(this.broadcastService.deleteBroadcast(this.id))
        .then((res) => {
          this.id = '';
          this.getData();
          this.visible = false;
        })
        .catch((err) => console.log(err));
    }
  }

  sendEmail(broadcast: any) {
    this.loading = true;
    firstValueFrom(this.broadcastService.sendEmail(broadcast))
      .then((res) => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }
}
