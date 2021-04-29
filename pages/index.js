import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home({ Items }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Beer Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <h1 className={styles.title}>
          Beer Shop
        </h1>
        <h3 className={styles.title}>
          Catalog
        </h3>
        <div className={styles.grid}>
          {Items.map((item) => {
            return (
              <Link key={item.id} href={`/beer-detail/${item.id}`}>
              <div className={styles.card}>
                <img className={styles.img} src={item.image_url} />
                <h3>{item.name}</h3>
                <p className={styles.description}>{item.amount}</p>
              </div>
              </Link>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
      <p>By: Marcos Gilmário</p>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('https://api.punkapi.com/v2/beers')
  const Items = await res.json();
  return {
    props: {
      Items
    },
  }
}

