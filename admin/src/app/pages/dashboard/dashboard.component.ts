import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { firstValueFrom, reduce } from 'rxjs';
import { CANCELED, PAID, SHIPPING } from 'src/app/constant/contant';
import { LoginResDto } from 'src/app/dto/login/login.res.dto';
import { OrderResDto } from 'src/app/dto/order/OrderResDto';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

interface YearReport {
  year: number;
}

interface DataOrderChart {
  time: string;
  total: number;
  month: number;
  year: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.profile = this.authService.getProfile();
    firstValueFrom(this.productService.getAllProduct())
      .then((res) => {
        this.totalProducts = res.length;
        this.productSold = res.filter((p) => !p.status).length;
        this.productsActive = res.filter((p) => p.status).length;
      })
      .catch((err) => console.log(err));

    firstValueFrom(this.categoryService.getAll())
      .then((res) => {
        this.allCategories = res.length;
      })
      .catch((err) => console.log(err));

    firstValueFrom(this.orderService.getAll())
      .then((res) => {
        this.totalOrders = res.length;
        this.shippingOrder = res.filter((o) => o.status == SHIPPING).length;
        this.paidOrder = res.filter((o) => o.status == PAID).length;
        this.canceledOrder = res.filter((o) => o.status == CANCELED).length;
        this.dataOrderPaidChart = res
          .filter((o) => o.status == SHIPPING)
          .map((data) => {
            const month = Number(data.updatedAt.split('-')[1]);
            const year = Number(data.updatedAt.split('-')[0]);
            return { time: data.updatedAt, total: data.total, month, year };
          });

        const allYear = [
          ...new Set(this.dataOrderPaidChart.map((data) => data.year)),
        ];

        for (const dataYear of allYear.sort().reverse()) {
          this.years?.push({ year: dataYear });
        }

        this.forms.get('formYear')?.setValue(this.years[0].year);

        for (let i = 1; i <= 12; i++) {
          this.monthData.push(
            this.dataOrderPaidChart
              .filter((data) => data.month === i)
              .reduce((totalOrder, data) => (totalOrder += data.total), 0)
          );
        }

        this.data = {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'Income',
              data: this.monthData,
              fill: false,
              borderColor: this.documentStyle.getPropertyValue('--primary'),
              tension: 0.4,
            },
          ],
        };

        // get total order
        this.totalOrderIncome = this.dataOrderPaidChart.reduce(
          (totalOrder, data) => (totalOrder += data.total),
          0
        );
      })
      .catch((err) => console.log(err));

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  // forms
  forms = this.fb.group({
    formYear: [0],
  });

  // helper
  documentStyle = getComputedStyle(document.documentElement);
  textColor = this.documentStyle.getPropertyValue('--text-color');
  textColorSecondary = this.documentStyle.getPropertyValue(
    '--text-color-secondary'
  );
  surfaceBorder = this.documentStyle.getPropertyValue('--surface-border');

  // Variables
  totalProducts!: number;
  productsActive!: number;
  productSold!: number;
  allCategories!: number;
  totalOrders!: number;
  shippingOrder!: number;
  paidOrder!: number;
  canceledOrder!: number;
  profile!: LoginResDto | null;
  data: any;
  options: any;
  dataOrderPaidChart: DataOrderChart[] = [];

  years: YearReport[] = [];
  selectedYear!: YearReport;

  // total orders
  totalOrderIncome!: number;

  // data income per months
  january!: number;
  february!: number;
  march!: number;
  april!: number;
  may!: number;
  june!: number;
  july!: number;
  august!: number;
  october!: number;
  september!: number;
  november!: number;
  december!: number;
  monthData: number[] = [];

  check() {
    const dataOrder = this.dataOrderPaidChart.filter(
      (data) => data.year == this.forms.get('formYear')?.value
    );

    const dataChart = [];
    for (let i = 1; i <= 12; i++) {
      dataChart.push(
        dataOrder
          .filter((data) => data.month === i)
          .reduce((totalOrder, data) => (totalOrder += data.total), 0)
      );
    }

    this.totalOrderIncome = dataOrder.reduce(
      (totalOrder, data) => (totalOrder += data.total),
      0
    );

    this.data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Income',
          data: dataChart,
          fill: false,
          borderColor: this.documentStyle.getPropertyValue('--primary'),
          tension: 0.4,
        },
      ],
    };
  }
}
