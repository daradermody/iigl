export interface DecodedJwt {
  iat: number;
  exp: number;
  sub: string;
  isAdmin: boolean;
}
