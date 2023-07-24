import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { MomentService } from '../app/service/moment.service';

const momentService = new MomentService();

export function isValidHour(): ValidatorFn {
  return (fieldForm: AbstractControl): ValidationErrors | null => {
    const form = fieldForm.parent;

    const departureDate = form?.get('departureDate')?.value;

    const departureTime = form?.get('departureTime')?.value;

    if (!departureTime) {
      return null;
    }

    return calcValidDate(departureDate, departureTime)
      ? null
      : { invalidHour: true };
  };
}

function calcValidDate(departureDate: string, departureTime: string) {
  if (!departureDate || !departureTime) {
    return;
  }

  const departureDateISOString = momentService.setDepartureDateToISOStr(
    departureDate,
    departureTime
  );

  return moment(departureDateISOString).isAfter(new Date().toISOString());
}

export function minimumDuration(): ValidatorFn {
  return (fieldForm: AbstractControl): ValidationErrors | null => {
    const form = fieldForm.parent;

    const duration = form?.get('durationEstimated')?.value;

    if (!duration) {
      return null;
    }

    const time = duration.split('');

    const hours = time.slice(0, 2).join('');
    const minutes = time.slice(2, 4).join('');

    const totalTime = 60 * Number(hours) + Number(minutes);

    if (!duration) {
      return null;
    }

    return Number(totalTime) < 30 ? { invalidDuration: true } : null;
  };
}
