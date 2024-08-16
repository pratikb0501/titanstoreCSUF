import { ShippingInfo } from "../cart/cartTypes";

export type CreateOrderResponse = {
  success: boolean;
  message: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderedItems: OrderSingleItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type OrderSingleItem = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  category: string;
  productId: string;
};

export type OrderResponse = {
  shippingInfo:ShippingInfo;
  _id:string;
  user:{
    _id:string;
    name:string;
  };
  subtotal:number;
  tax:number;
  discount:number;
  total:number;
  status:string;
  orderedItems:OrderSingleItem[];
  createdAt:Date
}


export type MyOrderResponse ={
  success:boolean;
  myOrders: OrderResponse[];
}

export type AllOrdersResponse ={
  success:boolean;
  allOrders: OrderResponse[];
}

export type OrderDetailsResponse ={
  success:boolean;
  myOrders: OrderSingleItem;
}

export type UpdateOrderRequest ={
  userId:string;
  orderId:string;
}

export type UpdateOrderStatusRequest ={
  adminId:string;
  orderId:string;
}

export type UpdateOrderStatusReponse ={
  success:boolean;
  message:string;
}
