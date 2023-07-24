import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../types/flight-details.type';
import { MomentService } from '../../../service/moment.service';
import { UserInfo } from '../../../service/types/user-info.type';
import { AuthService } from '../../../service/auth.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-flight-books',
  templateUrl: './flight-books.component.html',
  styleUrls: ['./flight-books.component.scss'],
})
export class FlightBooksComponent implements OnInit {
  flights?: Flight[] = [];
  userInfo?: UserInfo;
  showDeleteFlight = false;
  scheduleId = '';

  constructor(
    private authService: AuthService,
    private flightService: FlightService,
    private moment: MomentService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchFlights();
    this.authService.currentUser.subscribe(
      user => (this.userInfo = user as UserInfo)
    );
  }

  async fetchFlights(): Promise<void> {
    this.flights = await this.flightService.getFlights(
      new URLSearchParams({ take: '', skip: '' })
    );
  }

  hasUpdate(flight: Flight) {
    return this.moment.checkUpdate(flight.createdAt, flight.updatedAt);
  }

  formatDate(date: string): string {
    return this.moment.formatISODateString(date);
  }

  flightStatus(status: string): string {
    return status === 'BOOKED'
      ? 'Agendado'
      : status === 'CANCELED'
      ? 'Cancelado'
      : 'Realizada';
  }

  isDeleted(flight: Flight): boolean {
    return !!flight.deletedAt;
  }

  openModal(id: string): void {
    this.showDeleteFlight = true;
    this.scheduleId = id;
  }

  closeModal(): void {
    this.showDeleteFlight = false;
  }

  async deleteSchedule(): Promise<void> {
    try {
      await this.flightService.deleteFlight(this.scheduleId);
      this.handleDeleteSchedule(this.scheduleId);
      this.updateUserAvailability();

      this.showDeleteFlight = false;
    } catch (error) {
      console.log(error);
    }

    return;
  }

  handleDeleteSchedule(scheduleId: string): void {
    const schedule = this.flights?.find(
      (flight: Flight) =>
        scheduleId === flight.id && flight.flightStatus === 'BOOKED'
    );

    if (schedule) {
      schedule['flightStatus'] = 'CANCELED';
      this.notification.message({ message: 'Agendamento cancelado' });
    } else {
      this.notification.message({ message: 'Agendamento não encontrado' });
    }
  }

  showDeleteIcon(flight: Flight): boolean {
    return (
      flight?.flightStatus === 'BOOKED' &&
      (this.userInfo?.id === flight.pilotId || this.userInfo?.role === 'ADMIN')
    );
  }

  updateUserAvailability() {
    const user = {
      ...this.userInfo,
      isAvailable: true,
    } as UserInfo;

    localStorage.setItem('user', JSON.stringify(user));

    this.authService.updateUser(user);
  }

  viewDetails(flight: Flight): string {
    return `/agendamentos/${flight.id}/`;
  }
}
