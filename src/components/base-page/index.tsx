import Head from 'next/head'

interface Props {
    children: React.ReactNode
    title?: string
}

export function BasePage({ children, title = 'Catch your pokemon' }: Props) {
    return (
        <>
            <Head>
                <meta name="description" content="Jogo Pokemon" />
                <link rel="icon" href="/favicon.ico" />
                <title>{title}</title>
            </Head>

            {children}
        </>
    )
}
