import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-button',
  template: `
    <p-button
      *ngIf="show"
      type="{{ btnType }}"
      styleClass="{{ classBtn }}"
      (click)="clickBtn()"
      [loading]="loading"
      [label]="label"
      [disabled]="disabled"
      [icon]="icon"
      [style]="{ 'background-color': backgroundColor, border: 'none' }"
      size="small"
    >
    </p-button>
  `,
  imports: [SharedModule, CommonModule],
  standalone: true,
})
export class ButtonComponent {
  @Input() label = '';
  @Input() classBtn = '';
  @Input() btnType = '';
  @Input() loading = false;
  @Input() show = true;
  @Input() disabled = false;
  @Input() backgroundColor = '';
  @Input() icon = '';
  @Output() clickChange = new EventEmitter<void>();

  clickBtn() {
    this.clickChange.emit();
  }
}
