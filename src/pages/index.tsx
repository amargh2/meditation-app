import Image from 'next/image';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Timer from '@/components/Timer';

export default function Home() {
  return (
    <div className='flex justify-center p-2'>
      <Head></Head>
      <div className='flex items-center'>
          <Timer/>
      </div>
    </div>
  )
}
