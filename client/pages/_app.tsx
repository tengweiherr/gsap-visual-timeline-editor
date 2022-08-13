import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
