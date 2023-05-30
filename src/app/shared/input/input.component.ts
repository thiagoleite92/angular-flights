import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
export class InputComponent implements OnInit {
  @Input() public label = '';
  @Input() public placeHolder = '';
  @Input() public type = '';
  @Input() public fieldReference?: AbstractControl;
  @Input() public errorMessage?: string;
  @Input() public required = false;
  @Output() public btnIsDisabled: EventEmitter<boolean> = new EventEmitter();

  @Input() public isSelect = false;
  @Input() public isAsyncSelect = false;
  @Input() public isText = false;

  @Input() public options?: any;

  @Input() public editActualLocation: string | null = '';
  @Input() public editRole: string | null = '';

  public hide = true;

  ngOnInit(): void {
    if (this.editActualLocation) {
      this.fieldReference?.setValue(this.editActualLocation);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.fieldReference?.value);

    if (this.editActualLocation) {
      this.fieldReference?.setValue(
        changes['editActualLocation']?.currentValue
      );
    }

    if (this.editRole) {
      this.fieldReference?.setValue(changes['editRole']?.currentValue);
    }
  }

  onChange(event: any) {
    this.fieldReference?.setValue(event);
    this.fieldReference?.markAsDirty();

    this.btnIsDisabled.emit(this.fieldReference?.invalid);
  }

  renderLabel(label: string, required: boolean): string {
    return required ? `${label}*` : label;
  }

  isInvalid(reference: AbstractControl): boolean {
    return reference?.invalid && (reference?.touched || reference?.dirty);
  }
}
