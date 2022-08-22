import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '@styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CookiesProvider>
            <Component {...pageProps} />
            <ToastContainer />
        </CookiesProvider>
    )
}

export default MyApp
