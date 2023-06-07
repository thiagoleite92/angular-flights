import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CalcDate } from './types/calcDate.type';

@Injectable()
export class MomentService {
  getHourAndMinutes(hours: string) {
    let time;

    if (hours.includes(':')) {
      hours = hours.replace(':', '');
    }

    time = hours.split('');

    const horas = time.slice(0, 2).join('');
    const minutos = time.slice(2, 4).join('');

    return { hours: horas, minutes: minutos };
  }

  calcArriveDate({
    departureDate,
    departureTime,
    durationEstimated,
  }: CalcDate) {
    const { hours, minutes } = this.getHourAndMinutes(departureTime);

    const { hours: hoursD, minutes: minutesD } =
      this.getHourAndMinutes(durationEstimated);

    return moment(new Date(`${departureDate}`))
      .set('hours', Number(hours))
      .set('minutes', Number(minutes))
      .add(Number(hoursD), 'hours')
      .add(Number(minutesD), 'minutes')
      .format('DD/MM/YYYY HH:mm');
  }

  setDateToISOString(arriveDate: string): string {
    const [day, month, yearAndHour] = arriveDate?.split('/');

    const [year, hour] = yearAndHour?.split(' ');

    return `${year}-${month}-${day}T${hour}:00.000Z`;
  }

  setDepartureDateToISOStr(
    departureDate: string,
    departureTime: string
  ): string {
    const { hours, minutes } = this.getHourAndMinutes(departureTime);

    const date = moment(new Date(`${departureDate}`))
      .set('hours', Number(hours))
      .set('minutes', Number(minutes))
      .format('DD/MM/YYYY HH:mm');

    return this.setDateToISOString(date);
  }

  formatISODateString(date: string): string {
    return moment(date).format('DD/MM/YYYY HH:mm');
  }
}
