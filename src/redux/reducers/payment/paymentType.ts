export type PaymentResponse = {
  success: boolean;
  clientSecret: string;
};

export type PaymentPayload = {
  amount: number;
};
