import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
// import { Roles } from 'src/app/constant/role.constant';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.styles.css'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  imgUrl = '';
  roleCode: string | undefined = '';
  navbar: MenuItem[] | undefined;
  profile: MenuItem[] | undefined;

  dashboard = '';
  products = '';
  orders = '';
  banners = '';
  promotions = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.navbar = [
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
    ];

    this.dashboard =
      this.router.url === '/dashboard'
        ? 'border-left-2 border-pink-600 text-pink-600'
        : '';
    this.products =
      this.router.url === '/products'
        ? 'border-left-2 border-pink-600 text-pink-600'
        : '';
    this.orders =
      this.router.url === '/orders'
        ? 'border-left-2 border-pink-600 text-pink-600'
        : '';
    this.banners =
      this.router.url === '/banners'
        ? 'border-left-2 border-pink-600 text-pink-600'
        : '';
    this.promotions =
      this.router.url === '/promotions'
        ? 'border-left-2 border-pink-600 text-pink-600'
        : '';
  }

  onClick(route: string): void {
    this.router.navigateByUrl(route);
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
