import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightDetails } from '../types/flight-details.type';
import { FlightService } from '../flight.service';
import { MomentService } from '../../../service/moment.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  flightId = '';
  flightDetails?: FlightDetails;

  constructor(
    private flightService: FlightService,
    public moment: MomentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flightId = params['flightId'];
    });

    this.fetchFlightDetailsById(this.flightId);
  }

  async fetchFlightDetailsById(flightId: string): Promise<void> {
    this.flightDetails = await this.flightService.getFlightDetailsById(
      flightId
    );

    return;
  }

  formatDate(date: string | undefined): string {
    return this.moment.formatISODateString(date);
  }

  flightStatus(status: string | undefined): string {
    return status === 'BOOKED'
      ? 'Agendado'
      : status === 'CANCELED'
      ? 'Cancelado'
      : 'Realizada';
  }

  hasUpdate(flight: FlightDetails | undefined): boolean {
    console.log(flight?.route?.updatedAt, 'aqui');

    return this.moment.checkUpdate(flight?.createdAt, flight?.updatedAt);
  }

  isDeleted(flight: FlightDetails | undefined): boolean {
    return !!flight?.deletedAt;
  }
}
