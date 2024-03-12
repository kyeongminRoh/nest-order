export type LoginResponseDto = {
  accessToken: string;
  refreshToken: string;
  loginUser: {
    id: string;
    name: string;
    email: string;
  };
};
