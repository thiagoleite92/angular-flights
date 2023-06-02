import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectType } from '../../../shared/input/select-type';
import { LocationResponseType } from '../../../service/types/location-response.type';
import { LocationService } from '../../../service/location.service';

@Component({
  selector: 'app-routeform',
  templateUrl: './routeform.component.html',
  styleUrls: ['./routeform.component.scss'],
})
export class RouteformComponent implements OnInit {
  public routerForm: FormGroup;
  public btnIsDisabled = false;
  public routeId = '';
  public isEdit = false;

  public locations?: SelectType[] | any;

  public editActualLocation: string | null = '';
  public editRole: string | null = '';

  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {
    this.routerForm = this.fb.group({
      origin: ['', [Validators.required]],
      destiny: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      arriveDate: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
      durationEstimated: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const routeId = params?.['routeId'];
      if (!routeId) {
        return;
      }
      this.routeId = routeId;
      // this.fetchUserDetails(routeId);
    });

    this.isEdit = this.router.url.includes('/editar');
    this.locations = this.getLocations();
  }

  statusBtn(event: any): boolean {
    if (this.isEdit) {
      console.log('isEdit');

      return (this.btnIsDisabled =
        !event &&
        !!this.routerForm?.value?.name &&
        !!this.routerForm?.value?.email &&
        !!this.routerForm?.value?.actualLocation &&
        !!this.routerForm?.value?.role);
    }

    return (this.btnIsDisabled =
      !event &&
      !!this.routerForm?.value?.name &&
      !!this.routerForm?.value?.email &&
      !!this.routerForm?.value?.password &&
      !!this.routerForm?.value?.confirmPassword &&
      !!this.routerForm?.value?.actualLocation &&
      !!this.routerForm?.value?.role);
  }

  getReference(field: string): AbstractControl {
    return this.routerForm.controls[field];
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

  console(): void {
    console.log(this.routerForm.value['origin']);
  }
  isOriginFill(): boolean {
    return !this.routerForm.value['origin'];
  }
}
