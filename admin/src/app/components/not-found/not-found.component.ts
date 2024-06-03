import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'not-found',
  template: `
    <h1 class="text-center">SALAH ALAMAT</h1>
    <h1>SALAAAHHHH!!!!</h1>
  `,
  imports: [SharedModule],
  standalone: true,
})
export class NotFoundComponent {}
