import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Input() label: string = '';
  @Input() icon: string = 'filter';
  @Output() onClick = new EventEmitter<DropdownItem>();

  isOpen = false;

  constructor(private _eref: ElementRef) { }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  onItemClick(item: DropdownItem) {
    this.onClick.emit(item);
    this.isOpen = false;
}
}
