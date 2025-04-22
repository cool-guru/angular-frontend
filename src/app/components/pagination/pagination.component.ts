import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() totalPages: number = 1;
  @Output() goPrev = new EventEmitter<void>();
  @Output() goNext = new EventEmitter<void>();

  goPrevPage() {
    this.goPrev.emit();
  }

  goNextPage() {
    this.goNext.emit();
  }
}
