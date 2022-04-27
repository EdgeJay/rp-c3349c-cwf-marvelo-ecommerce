import CategoryButtons from "./CategoryButtons"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({ children, categories }) => {
  return (
    <div className="flex justify-center bg-gray-200">
      <div className="max-w-screen-lg flex flex-col min-h-screen w-full">
        <Navbar />
        <CategoryButtons categories={categories} />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="OWE1OTEwMmEtZTdiYi00NDRhLTk3ZWMtZmQ5NDQ0YjVmMWI5NjM3ODY2MjAwNjg1NTU3Njk2"
      />
    </div>
  )
}

export default Layout
