import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public type = 'text';
  @Input() public fieldReference?: AbstractControl;
  @Input() public errorMessage?: string;
  @Input() public required = false;
  @Output() public btnIsDisabled: EventEmitter<boolean> = new EventEmitter();
  @Output() public selectedOrigin: EventEmitter<string> = new EventEmitter();
  @Output() public calcArriveDateEmitter: EventEmitter<string> =
    new EventEmitter();
  @Output() public resetHourDepartureEmitter: EventEmitter<string> =
    new EventEmitter();

  @Input() public mask: string = '';
  @Input() public suffix: string = '';

  @Input() public isSelect = false;
  @Input() public isAsyncSelect = false;
  @Input() public isText = false;
  @Input() public isDatePicker = false;
  @Input() public isTime = false;

  @Input() isDisabled = false;

  @Input() public options?: any;

  public hide = true;
  public todayDate = new Date();

  onChange(event: any) {
    this.fieldReference?.setValue(event);
    this.fieldReference?.markAsDirty();

    if (this.label === 'Origem') {
      this.selectedOrigin.emit(event);
    }

    if (this.label === 'Data de Partida' && this.fieldReference?.valueChanges) {
      this.resetHourDepartureEmitter.emit();
    }

    if (this.label === 'Duração Estimada' && event.length === 4) {
      this.calcArriveDateEmitter.emit(event);
    }

    this.btnIsDisabled.emit(this.fieldReference?.invalid);
  }

  isInvalid(reference: AbstractControl): boolean {
    return reference?.invalid && (reference?.touched || reference?.dirty);
  }
}
