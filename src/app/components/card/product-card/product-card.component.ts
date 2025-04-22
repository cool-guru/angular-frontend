import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownComponent } from '@/app/components/dropdown/dropdown.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { baseUrl } from '@/app/config';
import { formatBytes, mimeToExtension } from '@/app/utils/helper';
import { ProductApiService } from '@/app/services/product-api/product-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [DropdownComponent, AngularSvgIconModule, CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit {

  @Input() data: Product = {
    _id: '',
    name: '',
    author: '',
    type: '',
    size: '',
    path: '',
    favourite: false
  };

  @Output() rename = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  
  showModal = false;
  form: FormGroup;

  dropdownItems = [
    { icon: 'share', label: 'Share', value: 'share' },
    { icon: 'edit', label: 'Rename', value: 'edit' },
    { icon: 'remove', label: 'Delete', value: 'delete' },
  ];

  constructor(
    private fb: FormBuilder,
    private productApi: ProductApiService
  ) {
    this.form = this.fb.group({
      name: [this.data.name],
    });
  }

  parsePath(path: string) {
    return `${baseUrl}/${path}`
  }

  formatSize(size: string) {
    return formatBytes(Number(size))
  }

  formatType(type: string) {
    return mimeToExtension(type)
  }

  onHover(video: HTMLVideoElement) {
    if (video.readyState >= 2) {
      video.play().catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    } else {
      video.load();
      video.oncanplay = () => {
        video.play().catch((err) => {
          console.warn('Autoplay after canplay failed:', err);
        });
      };
    }
  }
  
  onLeave(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0;
  }

  onFavourite(_id: string) {
    this.productApi.setFavourite(_id, !this.data.favourite).subscribe(res => {
      this.data.favourite = !this.data.favourite
    });
  }

  onActions(item: any) {
    switch (item.value) {
      case 'edit':
        this.openModal();
        break;
      case 'delete':
        this.onDelete();
        break;

      default:
        break;
    }
  }

  openModal() {
    this.showModal = true;
  };

  closeModal() {
    this.showModal = false;
  };

  onConfirm() {
    if (this.form.valid) {
      const updatedName = this.form.get('name')?.value
      this.rename.emit({ id: this.data._id, updated: updatedName });
      this.closeModal()
    }
  }

  onDelete() {
    this.delete.emit({ id: this.data._id });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.name],
    });
  }

}
