export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      featuredImage: { url: string; altText: string | null } | null;
    };
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
  };
  lines: {
    nodes: ShopifyCartLine[];
  };
};
