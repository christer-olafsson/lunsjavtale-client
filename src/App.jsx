import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import NotFound from './pages/notFound/Index'
import Search from './pages/search/Search'
import Login from './pages/login/Login'
import Layout from './pages/dashboard/Layout'
import MySide from './pages/dashboard/myside/MySide'
import ManageStaff from './pages/dashboard/manageStaff/ManageStaff'
import Products from './pages/dashboard/products/Products'
import Orders from './pages/dashboard/orders/Orders'
import Setting from './pages/dashboard/setting/Setting'
import Checkout from './pages/dashboard/myside/Checkout'
import OrderComplete from './pages/dashboard/myside/OrderComplete'
import CartPage from './pages/dashboard/myside/CartPage'
import ProductCartPage from './pages/dashboard/products/ProductCartPage'
import ProductCheckout from './pages/dashboard/products/ProductCheckout'
import EditOrder from './pages/dashboard/orders/EditOrder'
import OrderDetails from './pages/dashboard/orders/OrderDetails'
import OrderSingleDetails from './pages/dashboard/orders/OrderSingleDetails'
import { useEffect, useState } from 'react'
import EmailVerification from './pages/emailVerification/EmailVerification'
import PassReset from './pages/passReset/PassReset'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={token ? <Navigate to='/dashboard/myside' /> : <Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/email-verification/:token?' element={<EmailVerification />} />
        <Route path='/password-reset/:token?' element={<PassReset />} />
        <Route element={token ? <Layout /> : <Navigate to='/login' />}>
          <Route path='/dashboard/myside' element={<MySide />} />
          <Route path='/dashboard/myside/cart' element={<CartPage />} />
          <Route path='/dashboard/myside/checkout' element={<Checkout />} />
          <Route path='/dashboard/complete' element={<OrderComplete />} />
          <Route path='/dashboard/manage-staff' element={<ManageStaff />} />
          <Route path='/dashboard/products' element={<Products />} />
          <Route path='/dashboard/products/cart' element={<ProductCartPage />} />
          <Route path='/dashboard/products/checkout' element={<ProductCheckout />} />
          <Route path='/dashboard/orders' element={<Orders />} />
          <Route path='/dashboard/orders/details/:id' element={<OrderDetails />} />
          <Route path='/dashboard/orders/details/single/:id' element={<OrderSingleDetails />} />
          <Route path='/dashboard/orders/edit/:id' element={<EditOrder />} />
          <Route path='/dashboard/setting' element={<Setting />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
