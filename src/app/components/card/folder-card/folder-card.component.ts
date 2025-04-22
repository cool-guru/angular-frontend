import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownComponent } from '@/app/components/dropdown/dropdown.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '@/app/components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { formatBytes } from '@/app/utils/helper';

@Component({
  selector: 'app-folder-card',
  imports: [
    DropdownComponent,
    AngularSvgIconModule,
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ModalComponent,
  ],
  templateUrl: './folder-card.component.html',
  styleUrl: './folder-card.component.scss'
})
export class FolderCardComponent implements OnInit {
  @Input() data: Folder = {
    name: '',
    _id: '',
    createdAt: '',
    products: []
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
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: [this.data.name],
    });
  }

  getFolderSize(products: Product[]) {
    if (!products || products.length === 0) return '0 MB'

    const totalSize = products.reduce((sum, item) => {
      return sum + parseInt(item.size);
    }, 0);

    return formatBytes(totalSize)
  }

  goToDetail(_id: string) {
    this.router.navigate(['/folder', _id]);
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
