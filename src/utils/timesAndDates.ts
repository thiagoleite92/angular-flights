import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

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

  const [hours, minutes] = departureTime.split(':');

  const dateToday = moment(new Date()).format('DD-MM-yyyy HH:mm');

  const startDate = moment(new Date(`${departureDate}`))
    .set('hours', Number(hours))
    .set('minutes', Number(minutes))
    .format('DD-MM-yyyy HH:mm');

  return moment(startDate).isAfter(dateToday);
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

    console.log(totalTime);

    if (!duration) {
      return null;
    }

    return Number(totalTime) < 30 ? { invalidDuration: true } : null;
  };
}
