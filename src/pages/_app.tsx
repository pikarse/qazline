import type { AppProps } from 'next/app';
import { Layout } from '../components/Layout/Layout';
import '../styles/globals.css';
import '../i18n/config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
} 