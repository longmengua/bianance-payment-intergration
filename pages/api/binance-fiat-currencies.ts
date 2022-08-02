import { NextApiRequest, NextApiResponse } from "next";

export default async function binanceFiatCurrencies(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json('binanceFiatCurrencies')
}