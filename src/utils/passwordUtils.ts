import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isPasswordAndConfirmPasswordMatch(): ValidatorFn {
  return (campoForm: AbstractControl): ValidationErrors | null => {
    const form = campoForm.parent;
    const password = form?.get('password')?.value; // campos para serem comparados
    const confirmPassword = form?.get('confirmPassword')?.value; // campos para serem comparados

    return password === confirmPassword ? null : { passwordMatch: true }; // nome do erro para ser resgatado no .hasErros
  };
}

export function isPasswordStrong(): ValidatorFn {
  return (fieldForm: AbstractControl): ValidationErrors | null => {
    const form = fieldForm.parent;
    const password = form?.get('password')?.value;

    if (!password) {
      return null;
    }

    return /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      password
    )
      ? null
      : { passwordStrong: true };
  };
}
