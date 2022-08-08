/*
  ## Sandbox Environment
    - front end： https://sandbox.bifinity.org
    - integration api： https://sandbox.bifinitypay.com
  
  ## reference
    - https://nodejs.org/api/crypto.html#determining-if-crypto-support-is-unavailable
    - 
*/
import crypto from 'node:crypto';
import { BIANACE_ENV } from './const';
import { BinanceI } from './type';

export class Binance {
  static env: {
    privateKey: string;
    publicKey: string;
    domain: string;
  } = BIANACE_ENV;

  static sign = (data: string) => {
    return crypto.sign('RSA-SHA256', Buffer.from(data), this.env.privateKey).toString('base64');
  };

  static verify = (data: string, signature: string) => {
    return crypto.verify('RSA-SHA256', Buffer.from(data), this.env.publicKey, Buffer.from(signature, 'base64'));
  };

  static headers = () => {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    /*
      name         | type   | example     | remark
      merchantCode | string | TrustWallet | created by Binance Connect
    */
    headers.append('merchantCode', 'application/json');
    /*
      name      | type | example       | remark
      timestamp | long | 1617893300241 | timestamp
    */
    headers.append('timestamp', 'application/json');
    /*
      name            | type   | example       
      x-api-signature | string | c2492614ba35bd836a91c083f7103263919ce459 0b61e13013463ffed769ac80
    */
    headers.append('timestamp', 'application/json');
    return headers;
  };

  static fetch = async (url: string, method: string, data?: any) => {
    const res: Response = await fetch(`${this.env.domain}${url}`, {
      method: method,
      headers: this.headers(),
    });
    return res.json();
  };

  static fetchGET = async (url: string) => this.fetch(url, 'GET');

  static fetchPOST = async (url: string, data: any) => this.fetch(url, 'POST', data);

  /* 3.1
    Make a new trade and get the redirect url from Binance Connect. 
    Calling get-crypto-network-list and get-trade-pair-list api to get the input order amount limitation, 
    supported trading pair, network, memo before calling this api.
  */
  static createOrder = async (p: BinanceI['createOrder']['req']): Promise<BinanceI['createOrder']['res']> => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/connect/trade', p);
    return res;
  };

  // 3.2 query token buy order info
  static fetchTokenOrder = async (
    p: BinanceI['queryTokenOrder']['req'],
  ): Promise<BinanceI['queryTokenOrder']['res']> => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/connect/query-order-list', p);
    return res;
  };

  // 3.3 get a supported trading network info list.
  static fetchNetworkList = async (): Promise<BinanceI['netwrok']['res']> => {
    const res = await this.fetchGET('/gateway-api/v1/public/open-api/connect/get-crypto-network-list');
    return res;
  };

  // 3.4 get a supported crypto trade pair list.
  static fetchTradingPair = async (): Promise<BinanceI['tradePair']['res']> => {
    const res = await this.fetchGET('/gateway-api/v1/public/open-api/connect/get-trade-pair-list');
    return res;
  };

  // 3.5 check if the Ip address is supported.
  static checkIpAddress = async (p: BinanceI['checkIpAddress']['req']): Promise<BinanceI['checkIpAddress']['res']> => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/connect/check-ip-address', p);
    return res;
  };

  // 3.6 Query BUY_NFT/BUY_DEX_NFT order status.
  static queryNFTOrder = async (p: BinanceI['queryNFTOrder']['req']): Promise<BinanceI['queryNFTOrder']['res']> => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/business/query-business-order', p);
    return res;
  };

  // 3.7 Update BUY_NFT/BUY_DEX_NFT order status.
  static updateNFTOrder = async (p: BinanceI['updateNFTOrder']['req']): Promise<BinanceI['updateNFTOrder']['res']> => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/business/info-business-order-status', p);
    return res;
  };

  // 3.8 Get quotations for BUY_NFT/BUY_DEX_NFT business type.
  static fetchNFTQuotation = async (p: BinanceI['nftQuotation']['req']): Promise<BinanceI['nftQuotation']['res']> => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/quote/get-quote', p);
    return res;
  };

  /* 4.1
    For BUY_NFT/BUY_DEX_NFT business type, 
    this callback url is supposed to be provided by merchants, 
    when they need a webhook from Binance Connect to get the result of trade.
  */
  static nftOrderCallBack = async () => {
    const res = undefined;
    return res;
  };
}
