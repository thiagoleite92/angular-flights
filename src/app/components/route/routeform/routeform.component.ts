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
import { MomentService } from '../../../service/moment.service';
import { isValidHour, minimumDuration } from '../../../../utils/timesAndDates';
import { RouteService } from '../route.service';
import { NotificationService } from '../../../service/notification.service';

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

  public destinyLocations: SelectType[] | any;

  public editActualLocation: string | null = '';
  public editRole: string | null = '';

  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private moment: MomentService,
    private routeService: RouteService,
    private notificationsService: NotificationService
  ) {
    this.routerForm = this.fb.group({
      origin: ['', [Validators.required]],
      destiny: ['', [Validators.required]],
      departureDate: ['', [Validators.required]],
      departureTime: ['', [Validators.required, isValidHour()]],
      durationEstimated: [
        '',
        [Validators.required, Validators.minLength(4), minimumDuration()],
      ],
      arriveDate: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const routeId = params?.['routeId'];
      if (!routeId) {
        return;
      }
      this.routeId = routeId;
    });

    this.isEdit = this.router.url.includes('/editar');
    const loc = this.getLocations();

    this.locations = loc;
    this.destinyLocations = loc;
  }

  statusBtn(event: boolean): boolean {
    if (this.isEdit) {
      return (this.btnIsDisabled =
        !event &&
        !!this.routerForm?.value?.name &&
        !!this.routerForm?.value?.email &&
        !!this.routerForm?.value?.actualLocation &&
        !!this.routerForm?.value?.role);
    }

    return (this.btnIsDisabled =
      !event &&
      !!this.routerForm?.value?.origin &&
      !!this.routerForm?.value?.destiny &&
      !!this.routerForm?.value?.departureDate &&
      !!this.routerForm?.value?.departureTime &&
      !!this.routerForm?.value?.durationEstimated);
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

  filterLocations(event: any): void {
    const locs = this.locations.then((res: any) =>
      res.filter((loc: any) => loc?.value !== event)
    );

    this.destinyLocations = locs;

    return;
  }

  calcArriveDate(time: string): void {
    const date = {
      departureDate: this.routerForm?.value?.departureDate,
      departureTime: this.routerForm?.value?.departureTime,
      durationEstimated: time,
    };

    const arriveDate = this.moment.calcArriveDate(date);

    this.routerForm.patchValue({ arriveDate: arriveDate });
  }

  resetHour(): void {
    this.routerForm?.controls['departureTime'].reset();
    this.routerForm?.controls['durationEstimated'].reset();
    this.routerForm?.controls['arriveDate'].reset();
  }

  async handleSave(): Promise<void> {
    const data = {
      origin: this.routerForm?.value['origin'],
      destiny: this.routerForm?.value['destiny'],
      departureDate: this.moment.setDepartureDateToISOStr(
        this.routerForm?.value['departureDate'],
        this.routerForm?.value['departureTime']
      ),
      arriveDate: this.moment.setDateToISOString(
        this.routerForm?.value['arriveDate']
      ),
      durationEstimated: this.routerForm?.value['durationEstimated'],
    };

    try {
      await this.routeService.saveRoute(data);

      this.notificationsService.message({
        message: `Rota ${this.isEdit ? 'editada' : 'salva'} com sucesso.`,
      });

      this.router.navigate(['/rotas']);
    } catch (error: any) {
      const { statusCode, message } = error.error;

      if (statusCode === 409) {
        this.notificationsService.message({ message });
      }
    }
  }
}
