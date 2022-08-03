import { NextApiRequest, NextApiResponse } from "next";
import { Binance } from "../../src/util/binance.ts";

export default async function binanceQuotations(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const outcome = await Binance.fetchQuotations('', '', '', '', '' , 1);
  res.status(200).json(outcome)
}