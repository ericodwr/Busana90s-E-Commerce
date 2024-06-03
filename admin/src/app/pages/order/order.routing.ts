import { NgModule } from "@angular/core";
import { OrderListComponent } from "./list/order-list.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonComponent } from "src/app/components/button/button.component";

const routes:Routes = [
  {
    path:'',
    component:OrderListComponent
  }
]

@NgModule({
  declarations:[OrderListComponent],
  imports:[RouterModule.forChild(routes), CommonModule, SharedModule, ReactiveFormsModule, ButtonComponent],
  exports:[RouterModule]
}) export class OrderRouting{}