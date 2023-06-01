export type LoginResponse = {
  accessToken: string;
  user: {
    email: string;
    name: string;
    role: string;
    id: string;
    actualLocation?: string;
    isAvailable?: boolean;
    isActive?: boolean;
    flightExp?: number;
  };
};
