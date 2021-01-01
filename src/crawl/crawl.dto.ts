export interface CaptchaResponse {
  sessionId: string;
  captchaImage: string;
}

export interface VerifyTaxDTO {
  captcha: string;
  taxCode: string;
}
