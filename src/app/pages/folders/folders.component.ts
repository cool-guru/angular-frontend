import { Component } from '@angular/core';
import { FolderCardComponent } from "@/app/components/card/folder-card/folder-card.component";
import { ProductCardComponent } from '@/app/components/card/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalComponent } from "@/app/components/modal/modal.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FolderApiService } from '@/app/services/folder-api/folder-api.service';
import { EmptyComponent } from "@/app/components/empty/empty.component";
import { PaginationComponent } from '@/app/components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { ProductApiService } from '@/app/services/product-api/product-api.service';

@Component({
  selector: 'app-folders',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    FolderCardComponent,
    ProductCardComponent,
    ModalComponent,
    EmptyComponent,
    PaginationComponent,
    RouterModule
  ],
  templateUrl: './folders.component.html',
  styleUrl: './folders.component.scss'
})
export class FoldersComponent {
  showModal = false;
  form: FormGroup;
  submitted = false;
  formData: any;

  page: number = 1;
  limit: number = 21;
  totalPages: number = 0;
  users: any[] = [];
  folders: Folder[] | undefined;
  products: Product[] | undefined;

  constructor(
    private fb: FormBuilder,
    private folderApi: FolderApiService,
    private productApi: ProductApiService

  ) {
    this.form = this.fb.group({
      name: '',
    });
  }

  onConfirm() {
    if (this.form.valid) {
      this.submitted = true;
      this.formData = this.form.value;
      this.folderApi.create(this.formData).subscribe((res) => {
        this.fetchFolders();
      });
      this.closeModal()
    }
  }

  openModal() {
    this.showModal = true;
  };

  closeModal() {
    this.showModal = false;
  };

  fetchFolders() {
    this.folderApi.getFolders(this.page, this.limit).subscribe(res => {
      this.folders = res.data;
      this.totalPages = res.totalPages;
    });
  }

  fetchRecentProducts() {
    this.productApi.getRecentProducts(1, 7).subscribe(res => {
      this.products = res.data;
    });
  }

  onRename(event: any) {
    this.folderApi.rename(event.id, event.updated).subscribe((res) => {
      this.fetchFolders()
    });
  }

  onDelete(event: any) {
    this.folderApi.delete(event.id).subscribe((res) => {
      this.fetchFolders()
    });
  }

  onProductRename(event: any) {
    this.productApi.rename(event.id, event.updated).subscribe((res) => {
      this.fetchRecentProducts()
    });
  }

  onProductDelete(event: any) {
    this.productApi.delete(event.id).subscribe((res) => {
      this.fetchRecentProducts()
    });
  }

  goNext() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchFolders();
    }
  }

  goPrev() {
    if (this.page > 1) {
      this.page--;
      this.fetchFolders();
    }
  }

  ngOnInit() {
    this.fetchFolders();
    this.fetchRecentProducts();
  }
}
