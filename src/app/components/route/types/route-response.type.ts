export type RouteResponse = {
  id: string;
  Origem: string;
  Destino: string;
  Disponível: string;
  Partida: string;
  Chegada: string;
  Duração: string;
};

export type SingleRouteResponse = {
  arriveDate: string;
  createdAt: string;
  deletedAt: string | null;
  departureDate: string;
  destiny: string;
  durationEstimated: string;
  id: string;
  isAvailable: true;
  isDeleted: false;
  origin: string;
  updatedAt: string;
  userId: string;
};
