export enum BINANCE_ORDER_ENUM {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface BinanceI {
  createOrder: {
    req: {
      // base currency to pay => EUR.
      baseCurrency: string;
      // BUY/BUY_NFT/BUY_DEX_NFT, For none NFT business, pass BUY.
      businessType: string;
      // client user ip address
      clientUserIp?: string;
      // crypto currency to buy => BNB
      cryptoCurrency: string;
      // fiat currency to pay => EUR
      fiatCurrency: string;
      // merchant remark
      merchantNote?: string;
      // unique order id in merchant side
      merchantOrderId: string;
      // redirect url to jump after payment
      merchantRedirectUrl?: string;
      // unique user id in merchant side
      merchantUserId: string;
      // order amount to pay => 111.11
      orderAmount: number;
      // productDetailInfo required when businessType is BUY_NFT/BUY _DEX_NFT
      productDetailInfo?: {
        // product count
        productCount?: number;
        // product name
        productName: string;
        // product thumbnail
        thumbnail?: string;
        // tokenId
        tokenId: string;
        // address
        address?: string;
        // network
        network?: string;
      };
      // withdrawCryptoInfo required when businessType is BUY_NFT/BUY
      withdrawCryptoInfo?: {
        // crypto address to withdraw
        cryptoAddress: string;
        // crypto address tag
        cryptoAddressMemo?: string;
        // crypto network to withdraw
        cryptoNetwork: string;
      };
    };
    res: {
      // redirect url to Binance Connect h5
      eternalRedirectUrl: string;
      // order id from Binance Connect
      orderId: string;
    };
  };
  queryTokenOrder: {
    req: {
      // merchant side order id
      merchantOrderId: string;
    };
    res: {
      // base currency
      baseCurrency: string;
      // withdraw fee
      chainSettlementFee: number;
      // order id in Binance Connect side
      connectOrderId: string;
      // order create time in Binance Connect, format: date-time
      createTime: string;
      // crypto address to withdraw
      cryptoAddress: string;
      // crypto address tag
      cryptoAddressMemo?: string;
      // requested crypto currency
      cryptoCurrency: string;
      // crypto network to withdraw
      cryptoNetwork: string;
      // error code
      errorCode?: string;
      // error reason
      errorReason?: string;
      // executed price
      executePrice: number;
      // requested fiat currency
      fiatCurrency: string;
      // merchant code, created by Binance Connect
      merchantCode: string;
      // order id in merchant side
      merchantOrderId: string;
      // user id in merchant side
      merchantUserId: string;
      // obtained crypto amount
      obtainAmount: number;
      // requested order amount
      orderAmount: number;
      // init, processing ,success, failure
      orderMainStatus: string;
      // transaction Fees
      userFee: number;
    };
  };
  netwrok: {
    res: {
      // crypto currency
      cryptoCurrency: string;
      // is memo required
      memoRequired?: boolean;
      // supported crypto network
      network: string;
      // crypto address regular expression
      addressRegex?: string;
      // memo regular expression
      memoRegex?: string;
      // withdraw fee
      withdrawFee: number;
      // Maximum withdrawal amount
      withdrawMax: number;
      // Minimum withdrawal amount
      withdrawMin: number;
    };
  };
  tradePair: {
    res: {
      cryptoCurrency: string;
      fiatCurrency: string;
      // max order amount
      maxLimit?: number;
      // min order amount
      minLimit: number;
      // Crypto price
      quotation?: number;
      // incremental order amount each time
      size?: number;
    };
  };
  checkIpAddress: {
    req: {
      // merchant side client user ip address
      clientUserIp: string;
    };
    res: {
      // When it’s ok, will return “pass”
      status?: string;
    };
  };
  queryNFTOrder: {
    req: {
      merchantOrderId: string;
    };
    res: {
      // Enum: WAIT_FOR_PAYMENT, WAIT_FOR_DELIVERY, SUCCESS, FAILED
      status: string;
      merchantOrderId: string;
      merchantCode: string;
    };
  };
  updateNFTOrder: {
    req: {
      merchantOrderId: string;
      // SUCCESS, FAILED
      status: string;
    };
    res: {
      // SUCCESS, FAILED
      handleStatus: string;
    };
  };
  nftQuotation: {
    req: {
      baseCurrency: string;
      businessType: string;
      cryptoCurrency: string;
      fiatCurrency: string;
      quotePayType: string;
      requestedAmount: string;
    };
    res: {
      cryptoAmount?: number;
      fiatAmount?: number;
      merchantFee: number;
      quotationExpiredTime: number;
      quoteId: string;
      quotePrice: number;
      userFee: number;
    };
  };
  nftOrderCallBack: {
    req: {
      connectOrderId: string;
      merchantOrderId: string;
      // Enum: WAIT_DELIVERY, FAILED
      status: string;
      cryptoCurrency: string;
      fiatCurrency: string;
      cryptoNetwork: string;
      orderAmount: number;
      obtainAmount: number;
      chainSettlementFee: number;
      executePrice: number;
      userFee: number;
      // Parameters for executing smart contracts
      weiAmount: number;
      // Parameters for executing smart contracts
      expirationTimestamp: number;
      // when buy and withdraw crypto success, Binance Connect will generate the signature
      // Example: 0x4655c837135e40a40de5cc8fb1319d5c687a9409610eb95a82337f9e2ee842ba476e24f7f17182facde0ec80566635d8e7f648a9f63bb1c853af5bfc037716aa1b
      withdrawalSignature: string;
    };
    res: {
      // when merchant system handle notification success, then return “200”, else failed
      code: string;
      // when merchant system handle notification failed, return the error message
      message: string;
    };
  };
}
