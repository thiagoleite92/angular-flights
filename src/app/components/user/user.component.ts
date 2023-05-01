import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  isPasswordAndConfirmPasswordMatch,
  isPasswordStrong,
} from '../../../utils/passwordUtils';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  private userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
          isPasswordStrong(),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, isPasswordAndConfirmPasswordMatch()],
      ],
    });
  }

  getReference(field: string): AbstractControl {
    return this.userForm.controls[field];
  }
}
