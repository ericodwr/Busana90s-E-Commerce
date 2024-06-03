import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';
import { CategoryResDto } from 'src/app/dto/category/category.res.dto';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.styles.css'],
})
export class CreateProductComponent implements OnInit {
  ngOnInit(): void {
    this.adminId = this.authService.getProfile()?.id;

    firstValueFrom(this.categoryService.getAll())
      .then((res) => (this.categories = res))
      .catch((err) => console.log(err));
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  // Variables
  uploadedFiles: any[] = [];
  formData = new FormData();
  files: any = '';
  visible: boolean = false;
  adminId: string | undefined = '';
  categories: CategoryResDto[] = [];

  // Forms
  productForm = this.fb.group({
    name: ['', Validators.required],
    categoryId: ['', Validators.required],
    description: ['', Validators.required],
    size: ['', Validators.required],
    price: ['', Validators.required],
    quantity: [1, Validators.required],
  });

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    adminId: ['', Validators.required],
  });

  // Upload Files
  onUploadMultiple(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.formData.append('files', file);
    }
  }

  // Toggle Pop up Modal
  showDialog() {
    this.visible = true;
    this.categoryForm
      .get('adminId')
      ?.setValue(this.adminId ? this.adminId : '');
  }

  // Submit Forms
  onSubmit() {
    this.formData.append('name', this.productForm.getRawValue().name);
    this.formData.append(
      'price',
      this.productForm.getRawValue().price
        ? this.productForm.getRawValue().price
        : ''
    );
    this.formData.append(
      'categoryId',
      this.productForm.getRawValue().categoryId
    );
    this.formData.append('size', this.productForm.getRawValue().size);
    this.formData.append(
      'description',
      this.productForm.getRawValue().description
    );
    firstValueFrom(this.productService.createProduct(this.formData))
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl('/products');
      })
      .catch((err) => console.log(err));
  }

  onCreateCategory() {
    if (this.categoryForm.valid) {
      firstValueFrom(
        this.categoryService.create(this.categoryForm.getRawValue())
      )
        .then((res) => {
          this.categoryForm.reset();
          this.visible = false;
          firstValueFrom(this.categoryService.getAll())
            .then((res) => (this.categories = res))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }
}
