import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Output() public closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() public handleClick: EventEmitter<string> = new EventEmitter();
  @Input() id = '';

  handleCloseModal() {
    this.id = '';
    this.closeModal.emit(false);
  }

  click(id: string) {
    this.handleClick.emit(id);
  }
}
