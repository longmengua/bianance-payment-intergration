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
export enum BINANCE_ORDER_ENUM {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class Binance {
  static env: {
    privateKey: string;
    publicKey: string;
    domain: string;
  } = BIANACE_ENV;

  static sign = (data: string) => {
    return crypto.sign('RSA-SHA256', Buffer.from(data), this.env.privateKey).toString('base64');
  }

  static verify = (data: string, signature: string) => {
    return crypto.verify('RSA-SHA256', Buffer.from(data), this.env.publicKey, Buffer.from(signature, 'base64'));
  }

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
  }

  static fetch = async (url: string, method: string, data?: any) => {
    const res = await fetch(
      `${this.env.domain}${url}`, 
      {
        method: method,
        headers: this.headers(),
      },
    ); 
    return res;
  }

  static fetchGET = async (url: string) => this.fetch(url, 'GET')

  static fetchPOST = async (url: string, data?: any) => this.fetch(url, 'POST', data)
  // get a supported trading network info list.
  static fetchNetworkList = async () => {
    const res = await this.fetchGET('/gateway-api/v1/public/open-api/connect/get-crypto-network-list'); 
    return res;
  }
  // get a supported crypto trade pair list.
  static fetchTradingPair = async () => {
    const res = await this.fetchGET('/gateway-api/v1/public/open-api/connect/get-trade-pair-list'); 
    return res;
  }
  // check if the Ip address is supported.
  static verifyIpAddress = async (clientUserIp: string) => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/connect/get-trade-pair-list'); 
    return res;
  }
  // query BUY_NFT/BUY_DEX_NFT order status.
  static checkOrderStatus = async (merchantOrderId: string) => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/business/query-business-order'); 
    return res;
  }
  // update BUY_NFT/BUY_DEX_NFT order delivery status.
  static updateOrderStatus = async (merchantOrderId: string, status: BINANCE_ORDER_ENUM) => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/business/query-business-order'); 
    return res;
  }
  // get quotations for BUY_NFT/BUY_DEX_NFT business type.
  /*
    name            | type    | remark
    baseCurrency    | string  | base currency, e.g. EUR, BTC
    businessType    | string  | business type, e.g. BUY_NFT/ BUY_DEX_ NFT
    cryptoCurrency  | string  | crypto currency, e.g. ETH
    fiatCurrency    | string  | fiat currency, e.g. EUR, GBP
    quotePayType    | string  | quote pay type, Enum: ASK,BID
    requestedAmount | number  | request amount
  */
  static fetchQuotations = async (baseCurrency: string, businessType: string, cryptoCurrency: string, fiatCurrency: string, quotePayType: string, requestedAmount: number) => {
    const res = await this.fetchPOST('/gateway-api/v1/public/open-api/quote/get-quote'); 
    return res;
  }
}