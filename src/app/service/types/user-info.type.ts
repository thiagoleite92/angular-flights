export type UserInfo = {
  id: string;
  email: string;
  name: string;
  role: string;
  isAvailable?: boolean;
  flightExp?: number;
  actualLocation?: string;
};
