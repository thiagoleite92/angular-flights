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
} from '../../../../utils/passwordUtils';

import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../service/location.service';
import { NotificationService } from '../../../service/notification.service';
import { LocationResponseType } from '../../../service/types/location-response.type';
import { SelectType } from '../../../shared/input/select-type';
import { UserType } from '../types/user-type';
import { UserService } from '../user.service';
import { AuthService } from '../../../service/auth.service';
import { OneUser } from '../types/user-response.type';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  private userForm: FormGroup;
  public btnIsDisabled = false;
  public isLoading = false;
  public isEdit = false;
  public editActualLocation: string | null = '';
  public editRole: string | null = '';

  userId = '';

  public locations?: SelectType[] | any;

  public userOptions: UserType[] = [
    { label: 'ADMINISTRADOR', value: 'ADMIN' },
    { label: 'PILOTO', value: 'PILOT' },
  ];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params?.['userId'];
      if (!userId) {
        return;
      }
      this.userId = userId;
      this.fetchUserDetails(userId);
    });

    this.locations = this.getLocations();
    this.isEdit = this.router.url.includes('/editar');
  }

  getReference(field: string): AbstractControl {
    return this.userForm.controls[field];
  }

  async getLocations() {
    const locations = await this.locationService.get().then((response) => {
      return response.map((loc: LocationResponseType) => ({
        label: `${loc.sigla} - ${loc.nome}`,
        value: `${loc.sigla} - ${loc.nome}`,
      }));
    });

    return locations as SelectType[];
  }

  async saveUser() {
    if (
      this.userForm?.value?.password !== this.userForm?.value?.confirmPassword
    ) {
      this.userForm?.controls['confirmPassword'].setErrors({
        passwordMatch: 'true',
      });
      return;
    }

    const data = {
      name: this.userForm?.value['name'],
      email: this.userForm?.value['email'],
      password: this.userForm?.value['password'],
      actualLocation: this.userForm?.value['actualLocation'],
      role: this.userForm?.value['role'],
    };

    try {
      if (this.isEdit) {
        await this.userService.updateUser(this.userId, data);
      } else {
        await this.userService.post('/user', data);
      }

      this.notificationService.message({
        message: `Usuário ${this.isEdit ? 'editado' : 'salvo'} com sucesso.`,
      });
      this.router.navigate(['/usuarios']);
    } catch (error: any) {
      const { message } = error.error;
      const { status } = error;

      if (error && status === 409) {
        this.notificationService.message({ message });
        this.userForm?.controls['email'].setValue('');
        this.userForm?.controls['email'].setErrors({ required: 'true' });
        this.btnIsDisabled = false;
        return;
      }

      if (error && status === 401) {
        this.authService.logout();
        this.notificationService.message({
          message: 'Sessão expirada. Faça login novamente.',
        });
        this.router.navigate(['/login']);
        return;
      }
    }
  }

  statusBtn(event: any): boolean {
    if (this.isEdit) {
      return (this.btnIsDisabled =
        !event &&
        !!this.userForm?.value?.name &&
        !!this.userForm?.value?.email &&
        !!this.userForm?.value?.actualLocation &&
        !!this.userForm?.value?.role);
    }

    return (this.btnIsDisabled =
      !event &&
      !!this.userForm?.value?.name &&
      !!this.userForm?.value?.email &&
      !!this.userForm?.value?.password &&
      !!this.userForm?.value?.confirmPassword &&
      !!this.userForm?.value?.actualLocation &&
      !!this.userForm?.value?.role);
  }

  async fetchUserDetails(userId: string): Promise<any> {
    try {
      const user = (await this.userService.getUsers(userId)) as OneUser;

      if (!user) {
        this.notificationService.message({ message: 'Usuário não encontrado' });
        return this.router.navigateByUrl('/usuarios');
      }

      const userInfo = {
        name: user.name,
        actualLocation: user.actualLocation,
        email: user.email,
        role: user.role === 'PILOT' ? 'PILOTO' : 'ADMINISTRADOR',
      };

      this.userForm.patchValue(userInfo);

      console.log(this.userForm);

      this.editActualLocation = userInfo.actualLocation ?? null;
      this.editRole = user.role === 'PILOT' ? 'PILOT' : 'ADMIN';
    } catch (error) {}
  }
}
