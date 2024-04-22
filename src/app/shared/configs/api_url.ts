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
    ListGoldAreaOption: () => 'exchange-rate/list-area-gold',
    ConvertGoldWorld: () => 'exchange-rate/exchange-gold-world',
    ConvertGold: () => 'exchange-rate/exchange-gold-tudo',

    ConvertMoney: () => 'exchange-rate/convert-money',
  },
  Article: {
    List: () => '/news/list-news',
    Categories: () => 'article/categories',
    Detail:()  => '/news/get/',
  },

  Biexce: {
    Exchange: {
      List: () => 'exchange/list-exchange',
      ListCurrencies: () => 'exchange/currencies',
      CalculateRate: () => 'exchange/calculate',
    },
  },
  Charged: {
    calculateloan: () => 'loan/calculate-loan',
  },
};
