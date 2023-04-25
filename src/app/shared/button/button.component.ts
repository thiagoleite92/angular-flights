import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() type: string = 'button';
  @Input() isDisabled?: boolean;
  @Input() isLoading: boolean = false;

  public hide: boolean = true;
}
