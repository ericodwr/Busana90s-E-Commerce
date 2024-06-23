import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BroadcastResDto } from 'src/app/dto/broadcast/broadcastResDto';
import { LoginResDto } from 'src/app/dto/login/login.res.dto';
import { AuthService } from 'src/app/services/auth.service';
import { BroadcastService } from 'src/app/services/broadcast.service';

@Component({
  selector: 'list-broadcast',
  templateUrl: './list-broadcast.component.html',
})
export class ListBroadcastComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private broadcastService: BroadcastService,
    private authService: AuthService
  ) {}

  getData() {
    firstValueFrom(this.broadcastService.getAllBroadcast())
      .then((res) => {
        this.broadcasts = res;
      })
      .catch((err) => console.log(err));

    this.profile = this.authService.getProfile();
  }

  ngOnInit(): void {
    this.getData();
  }

  // Variables
  broadcasts: BroadcastResDto[] = [];
  visible: boolean = false;
  id: string = '';
  profile!: LoginResDto | null;

  // Functions

  // is Admin
  get isAdmin() {
    return this.profile?.username === 'admin';
  }

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
