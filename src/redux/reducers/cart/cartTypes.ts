
export type ShippingInfo = {
  address:string;
  city:string;
  state:string;
  country:string;
  zipcode:string
}

export type CartItem={
  productId:string;
  photo:string;
  name:string;
  price:number;
  quantity:number;
  category:string;
  stock:number
}

export type CartReducerInitialState={
  loading:boolean;
  cartItems:CartItem[];
  subtotal:number;
  tax:number;
  shippingCharges:number;
  discount:number;
  total:number;
  shippingInfo:ShippingInfo,
  category:string;
}