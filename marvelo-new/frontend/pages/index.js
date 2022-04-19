import Head from "next/head"
import ProductsList from "../components/ProductsList"
import { getProducts } from "../utils/api"

const HomePage = ({ products }) => {
  console.log(process.env.NEXT_PUBLIC_STRAPI_API_URL)
  console.log(process.env.NEXT_PUBLIC_STRAPI_UPLOADS_URL)
  return (
    <div>
      <Head>
        <title>Marvelo Sticker Shop</title>
      </Head>
      <ProductsList products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}

export default HomePage
