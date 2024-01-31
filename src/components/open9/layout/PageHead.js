import Head from 'next/head'

const PageHead = ({ headTitle }) => {
    return (
        <>
            <Head>
                <title>
                    {headTitle ? headTitle : "Atsur Registry | Explore investment ready African artworks"}
                </title>
            </Head>
        </>
    )
}

export default PageHead