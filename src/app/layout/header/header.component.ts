import { Component } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";

@Component({
  selector: 'app-header',
  imports: [DropdownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  dropdownItems = [
    { icon: 'favourite', label: 'Favourites', value: 'favourite' },
    { icon: 'shared', label: 'Shared files', value: 'shared' },
    { icon: 'status', label: 'Status', value: 'status' },
  ];
}
