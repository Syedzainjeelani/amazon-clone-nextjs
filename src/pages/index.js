import styles from '../styles/Home.module.css'
import Product from '../components/Product'
import { Carousel } from 'react-responsive-carousel'
import carouselStyles from 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Home() {



  return (
    <div className={styles.home}>

      <div className={styles.home__container}>
        <Carousel className={carouselStyles}
          showStatus={false}
          infiniteLoop={true} autoPlay={false} swiping={true} showIndicators={false} showThumbs={false} showArrows={true}>
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

      <div className={styles.home__row}>
        <Product
          id="12321341"
          title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
          price={11.96}
          rating={5}
          image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
        />
        <Product
          id="49538094"
          title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
          price={239.0}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
        />
      </div>

      <div className={styles.home__row}>
        <Product
          id="4903850"
          title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
          price={199.99}
          rating={3}
          image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
        />
        <Product
          id="23445930"
          title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
          price={98.99}
          rating={5}
          image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
        />
        <Product
          id="3254354345"
          title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
          price={598.99}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
        />
      </div>

      <div className={styles.home__row}>
        <Product
          id="90829332"
          title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
          price={1094.98}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
        />
      </div>


    </div>
  )
}
