export interface VerifyCodeSchema {
  code: string;
}

export interface VerifyCodeResponseSchema {
  valid: boolean;
  token?: string;
}

export interface AuthInfoResponseSchema {
  username: string;
  quote: string;
  photo: string;
}
