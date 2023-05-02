import { Component, OnInit } from '@angular/core';
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
import { LocationService } from '../../service/location.service';
import { LocationResponseType } from '../../service/types/location-response.type';
import { SelectType } from '../../shared/input/select-type';
import { UserType } from './types/user-type';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  private userForm: FormGroup;

  public locations?: SelectType[] | any;

  public userOptions: UserType[] = [
    { label: 'ADMINISTRADOR', value: 'ADMIN' },
    { label: 'PILOTO', value: 'PILOT' },
  ];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {
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
      actualLocation: ['', [Validators.required]],
      isAdmin: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.locations = this.getLocations();
  }

  getReference(field: string): AbstractControl {
    return this.userForm.controls[field];
  }

  async getLocations() {
    const locations = await this.locationService.get().then((response) => {
      return response.map((loc: LocationResponseType) => ({
        label: `${loc.sigla} - ${loc.nome}`,
        value: loc.nome,
      }));
    });

    return locations as SelectType[];
  }

  viewForm() {
    console.log(this.userForm?.value);
  }
}
