import { NextApiRequest, NextApiResponse } from "next";
import { Binance } from "../../src/util/binance.ts";
import { BinanceJavaPKCS8 } from "../../src/util/binance.ts/example";

export default async function binanceSignTest(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const outcome = Binance.sign(BinanceJavaPKCS8.rawContent);
  res.status(200).json({
    dataIsSame: outcome.data === BinanceJavaPKCS8.rawContent,
    signedDataIsSame: outcome.signedData === BinanceJavaPKCS8.signedContent,
    signedData: outcome.signedData,
    signedDataExample: BinanceJavaPKCS8.signedContent,
  })
}