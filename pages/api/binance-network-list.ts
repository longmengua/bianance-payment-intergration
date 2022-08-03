import { NextApiRequest, NextApiResponse } from "next";
import { Binance } from "../../src/util/binance.ts";

export default async function binanceNetworkList(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const outcome = await Binance.fetchNetworkList();
  res.status(200).json(outcome)
}