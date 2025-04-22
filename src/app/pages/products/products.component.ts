import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductCardComponent } from '@/app/components/card/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalComponent } from "@/app/components/modal/modal.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmptyComponent } from "@/app/components/empty/empty.component";
import { PaginationComponent } from '@/app/components/pagination/pagination.component';
import { ProductApiService } from '@/app/services/product-api/product-api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ProductCardComponent,
    ModalComponent,
    EmptyComponent,
    PaginationComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription | undefined;

  folderId: string = '';
  showModal = false;
  form: FormGroup;
  submitted = false;
  formData: any;
  selectedFile: File | null = null;

  page: number = 1;
  limit: number = 21;
  totalPages: number = 0;
  products: Product[] | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productApi: ProductApiService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      video: [null, Validators.required],
    });
  }

  onConfirm() {
    this.submitted = true;
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('folderId', this.folderId);
      formData.append('name', this.form.get('name')?.value);
      formData.append('author', this.form.get('author')?.value);
      formData.append('video', this.selectedFile!);
      this.productApi.create(formData).subscribe((res) => {
        this.fetchProducts();
      });
      
      this.closeModal()
      this.submitted = false;
    }
  }

  openModal() {
    this.showModal = true;
    this.submitted = false;
  };

  closeModal() {
    this.showModal = false;
    this.submitted = false;
  };

  triggerFileInput() {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && file.type.startsWith('video/')) {
      this.selectedFile = file;
      this.form.patchValue({ video: file });
    } else {
      alert('Please upload a valid video file');
    }
  }

  fetchProducts() {
    this.productApi.getProducts(this.folderId, this.page, this.limit).subscribe(res => {
      this.products = res.data;
      this.totalPages = res.totalPages;
    });
  }

  goNext() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchProducts();
    }
  }

  goPrev() {
    if (this.page > 1) {
      this.page--;
      this.fetchProducts();
    }
  }

  onRename(event: any) {
    this.productApi.rename(event.id, event.updated).subscribe((res) => {
      this.fetchProducts()
    });
  }

  onDelete(event: any) {
    this.productApi.delete(event.id).subscribe((res) => {
      this.fetchProducts()
    });
  }

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.folderId = params.get('id') || '';
    });
    this.fetchProducts();
  }

  ngOnDestroy() {
    if(this.routeSub){
      this.routeSub.unsubscribe()
    }
  }
}
