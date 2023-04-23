import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() public label: string = '';
  @Input() public placeHolder: string = '';
  @Input() public type: string = '';
  @Input() public fieldReference?: AbstractControl;
  @Input() public errorMessage?: string;
  @Input() public required: boolean = false;

  ngOnInit(): void {}

  onChange(event: any) {
    this.fieldReference?.setValue(event);
    this.fieldReference?.markAsDirty();
  }

  renderLabel(label: string, required: boolean): string {
    return required ? `${label}*` : label;
  }

  isInvalid(reference: AbstractControl): boolean {
    return reference?.invalid && (reference?.touched || reference?.dirty);
  }
}
