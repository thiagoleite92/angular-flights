export type Flight = {
  id: string;
  routeId: string;
  pilotId: string;
  flightStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDeleted: boolean;
};

export type FlightDetails = {
  id: string;
  routeId: string;
  pilotId: string;
  flightStatus: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDeleted: true;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    isActive: true;
    isAvailable: true;
    flightExp: number;
    actualLocation: string;
    createdAt: string;
    updatedAt: string;
  };
  route: {
    id: string;
    origin: string;
    destiny: string;
    durationEstimated: string;
    departureDate: string;
    arriveDate: string;
    isAvailable: true;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    isDeleted: false;
    userId: string;
  };
};
