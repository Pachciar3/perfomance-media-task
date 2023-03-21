import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';

import { AppWrapper } from '@/components/context/main';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
