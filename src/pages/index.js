import styles from '../styles/Home.module.css'
import Product from '../components/Product'
import { Carousel } from 'react-responsive-carousel'
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import { auth, db } from "../firebase"

export async function getServerSideProps(context) {
  let products;

  await db.collection("inventory")
    .doc("inventory_products")
    .get().then((querySnap) => {
      console.log(querySnap.data().products)
      products = querySnap.data().products

    })

  return {
    props: {
      "products": products
    },
  }
}

export default function Home(props) {
  const { products } = props
  return (
    <div className={styles.home}>

      <div className={styles.home__container}>
        <Carousel className={carouselStyles}
          showStatus={false}
          infiniteLoop={true} autoPlay={true} swiping={true} showIndicators={false} showThumbs={false} showArrows={true}>
          <img className={styles.home__image}
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Audio/Hdpns_Gw_1500x600._CB415716258_.jpg"
            alt="home_bg_img"
          />
          <img className={styles.home__image}
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Bestselling/D19195575_IN_CEPC_Bestselling_electronics_Dec20_3000x12000.5x._CB412289246_.jpg"
            alt="home_bg_img"
          />

          <img className={styles.home__image}
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt="home_bg_img"
          />

          <img className={styles.home__image}
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Samsung/FPF_DEC/GW_Rv4Family/D19594167_IN_WL_FPF_Samsung_MFamily_DesktopTallHero_1500x600._CB412285055_.jpg"
            alt="home_bg_img"
          />

          <img className={styles.home__image}
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/HFC/April20/Gateway/Hero_PC_1500x600_4._CB414382851_.jpg"
            alt="home_bg_img"
          />

          <img className={styles.home__image}
            src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2020/May/gaming_1500x600._CB431281464_.jpg"
            alt="home_bg_img"
          />
        </Carousel>
      </div>

      <div className={styles.home__grid}>
        <div className={styles.home__row}>

          {products.map((product, ind) => {
            return <Product
              key={ind}
              id={product.id}
              title={product.title}
              price={product.price}
              rating={Math.round(product.rating)}
              image={product.image}
            />
          })}
        </div>
      </div>

    </div>
  )
}
