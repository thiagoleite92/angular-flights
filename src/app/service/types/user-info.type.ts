export type UserInfo = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'PILOT';
  isAvailable?: boolean;
  flightExp?: number;
  actualLocation?: string;
};
