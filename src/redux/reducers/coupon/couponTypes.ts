export interface Coupon {
  couponCode: string;
  amount: number;
}

export interface CouponResponse extends Coupon {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface CouponPayload extends Coupon {
  adminId: string;
}

export interface DeleteCouponPayload {
  adminId: string;
  couponId: string;
}

export interface NewCouponResponse {
  success: boolean;
  message: string;
}
export interface DeleteCouponResponse {
  success: boolean;
  message: string;
}

export interface CouponErrorResponse {
  data: {
    error: string;
    success: boolean;
  };
  status: number;
}

export interface AllCouponsResponse {
  success: boolean;
  coupons: CouponResponse[];
}

export type verifyCouponResponse = {
  discount: number;
  success: boolean;
};
