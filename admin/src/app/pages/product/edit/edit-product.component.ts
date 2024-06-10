import { Component, OnInit } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { BASE_URL_IMG } from 'src/app/constant/api.constant';
import { CategoryResDto } from 'src/app/dto/category/category.res.dto';
import {
  CurrentProductImgResDto,
  ProductImgResDto,
} from 'src/app/dto/product/productImgResDto';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponet implements OnInit {
  getData() {
    firstValueFrom(this.categoryService.getAll())
      .then((res) => (this.categories = res))
      .catch((err) => console.log(err));

    firstValueFrom(this.activatedRoute.paramMap)
      .then((res) => {
        this.productId = res.get('id');
        firstValueFrom(this.productService.getById(this.productId))
          .then((res) => {
            this.productForm.get('name')?.setValue(res.name);
            this.productForm.get('description')?.setValue(res.description);
            this.productForm.get('price')?.setValue(res.price);
            this.productForm.get('size')?.setValue(res.size);
            this.productForm.get('categoryId')?.setValue(res.categoryId);
            this.productForm.get('status')?.setValue(res.status);

            this.currentImages = res.product_imgs;
            for (const img of this.currentImages) {
              this.data.push(
                this.fb.group({
                  id: img.id,
                  img_url: img.img_url,
                  isDeleted: false,
                })
              );
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  ngOnInit() {
    this.getData();
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // Variables
  uploadedFiles: any[] = [];
  currentImages: ProductImgResDto[] = [];
  formData = new FormData();
  files: any = '';
  visible: boolean = false;
  adminId: string | undefined = '';
  categories: CategoryResDto[] = [];
  api: string = BASE_URL_IMG;
  productId: string | null = '';
  statusOptions: any[] = [
    { label: 'Hide', value: false },
    { label: 'Show', value: true },
  ];

  // Forms
  productForm = this.fb.group({
    name: ['', Validators.required],
    categoryId: ['', Validators.required],
    description: ['', Validators.required],
    size: ['', Validators.required],
    price: [0, Validators.required],
    quantity: [1, Validators.required],
    deletedImg: this.fb.array(this.currentImages),
    status: ['', Validators.required],
  });

  categoryForm = this.fb.group({
    name: ['', Validators.required],
    adminId: ['', Validators.required],
  });

  currentImgForm = this.fb.group({
    data: this.fb.array(this.currentImages),
  });

  get data() {
    return this.currentImgForm.get('data') as FormArray;
  }

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
    const deletedImg = this.data.controls.filter(
      (img) => img.get('isDeleted')?.value !== false
    );
    const deleted = deletedImg.map((img) => img.value);
    this.formData.append('id', JSON.stringify(this.productId));
    this.formData.append('name', this.productForm.getRawValue().name);
    this.formData.append(
      'price',
      this.productForm.getRawValue().price.toString()
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
    this.formData.append('status', this.productForm.getRawValue().status);

    this.formData.append('deletedImg', JSON.stringify(deleted));

    firstValueFrom(this.productService.updateProduct(this.formData))
      .then((res) => {
        this.router.navigateByUrl('/products');
      })
      .catch((err) => console.log(err));
  }

  // Create Category
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

  // Delete current images
  onDeleteCurrentImg(i: number) {
    const currentData = this.data.controls[i].get('isDeleted');
    if (currentData?.value) {
      currentData.setValue(false);
    } else {
      currentData?.setValue(true);
    }

    const deletedImg = this.data.controls.filter(
      (img) => img.get('isDeleted')?.value !== false
    );
  }
}
