import type { NextPage } from 'next'
import Head from 'next/head'
import { Binance } from '../src/component/binance'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>BANXA integration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Binance />
    </div>
  )
}

export default Home
