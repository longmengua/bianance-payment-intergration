import { NextApiRequest, NextApiResponse } from "next";
import { Binance } from "../../src/util/binance.ts";

export default async function binanceSign(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = 'merchantId=1&merchantUserEmail=test@binance.com&merchantUserId=1234&merchantUserPhone=13641870385&phoneCountryCode=86&merchantCode=MerchantJeff&timestamp=1628128760942';
  const signature = Binance.sign(data);
  res.status(200).json({
    data,
    signature,
  })
}