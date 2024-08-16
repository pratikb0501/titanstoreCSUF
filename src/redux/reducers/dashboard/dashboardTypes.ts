type StatsNumber = {
  revenue: number;
  products: number;
  users: number;
  orders: number;
};
type UserRatio = {
  male: number;
  female: number;
};
export type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type StatsResponse = {
  success: boolean;
  categoryCount: Record<string, number>[];
  dashboardStats: {
    percentChange: StatsNumber;
    counts: StatsNumber;
    chart: {
      order: number[];
      revenue: number[];
    };
    userRatio: UserRatio;
    latestTransaction: LatestTransaction[];
  };
};

export type OrderFullFillment = {
  delivered: number;
  processing: number;
  shipped: number;
};

export type UserDistribution = {
  admin: number;
  customer: number;
};

export type StockAvailability = {
  inStock: number;
  outOfStock: number;
};

export type userAgeDistribution = {
  teen: number;
  adult: number;
  old: number;
};
