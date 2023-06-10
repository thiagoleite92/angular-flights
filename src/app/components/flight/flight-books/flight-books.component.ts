import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../types/flight-details.type';
import { MomentService } from '../../../service/moment.service';

@Component({
  selector: 'app-flight-books',
  templateUrl: './flight-books.component.html',
  styleUrls: ['./flight-books.component.scss'],
})
export class FlightBooksComponent implements OnInit {
  flights?: Flight[] = [];

  constructor(
    private flightService: FlightService,
    private moment: MomentService
  ) {}
  ngOnInit(): void {
    this.fetchFlights();
  }

  async fetchFlights(): Promise<void> {
    this.flights = await this.flightService.getFlights();

    console.log(this.flights);
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
}
