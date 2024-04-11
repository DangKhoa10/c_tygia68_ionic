export const ApiUrl = {
  Exchange: {
    ListExchange: () => 'exchange-rate/list-exchange',
    GoldPrice: () => 'exchange-rate/gold-price-v2',
    GoldReference: () => 'exchange-rate/gold-reference',
    GoldArea: () => 'exchange-rate/price-of-area',
    NicePrice: () => 'exchange-rate/nice-price',
    Bank: (id: string) => `exchange-rate-bank/${id}`,
    ListGoldArea: () => 'exchange-rate/list-area-gold',
    ListBank: () => 'exchange-rate-bank/list-banks',
  },
};
