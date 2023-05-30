export type AllUsers = {
  id: string;
  Status: boolean;
  Nome: string;
  'Tempo de voo': string;
  Função: string;
  Localização: string;
};

export type OneUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  flightExp: number;
  actualLocation: null | string;
  createdAt: string;
  updatedAt: string;
};
