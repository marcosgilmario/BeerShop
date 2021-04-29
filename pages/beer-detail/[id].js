import Link from 'next/link';
import Head from 'next/head';
import style from '../../styles/beer-detail.module.css'

export default function beerDetail({ Items }) {
    return (
        <div className={style.container}>
            <Head>
                <title>Beer Shop</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={style.main}>
                <h1 className={style.title}>Beer Shop</h1>
                <button className={style.backButton}>
                <Link href="/"><b>⬅ Back to Catalog</b></Link>
                </button>
                {Items.map(item => {
                    return (
                        <div key={item.id} className={style.grid}>
                            <div>
                                <h1><b>{item.name}</b></h1>
                                <img className={style.img} src={item.image_url} />
                            </div>
                            <div className={style.card}>

                                <div key={item.id}>
                                    <p><b>Tagline:</b> {item.tagline}<br /></p>
                                    <p><b>First Brewed:</b> {item.first_brewed}<br /></p>
                                    <p><b>Description:</b> {item.description}<br /></p>
                                    <p><b>ABV:</b> {item.abv}<br /></p>
                                    <p><b>IBU:</b> {item.ibu}<br /></p>
                                    <p><b>volume:</b> {item.volume.value} {item.volume.unit}<br /></p>
                                    <p><b>Boil Volume:</b> {item.boil_volume.value} {item.boil_volume.unit}<br /></p>
                                    <p><b>Brewers Tips:</b> {item.brewers_tips}<br /></p>
                                    <p><b>Contributed By:</b> {item.contributed_by}<br /></p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </main>
        </div>
    )
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://api.punkapi.com/v2/beers/${params.id}`)
    const Items = await res.json();
    return {
        props: {
            Items
        },
    }
}


export async function getStaticPaths() {

    const res = await fetch('https://api.punkapi.com/v2/beers')
    const Items = await res.json();
    return {
        paths: Items.map((item) => ({
            params: {
                id: item.id.toString(),
            },
        })),
        fallback: false,
    };
}
