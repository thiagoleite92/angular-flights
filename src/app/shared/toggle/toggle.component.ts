import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input() checked?: boolean = false;
  @Input() id = '';
  @Output() handleChange = new EventEmitter<{
    id: string;
    isActive: boolean;
  }>();

  change(id: string, isActive: boolean) {
    console.log(isActive);

    this.handleChange.emit({ id, isActive });
  }
}
