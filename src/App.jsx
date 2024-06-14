import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
import OrderComplete from './pages/dashboard/products/OrderComplete'
import ProductCartPage from './pages/dashboard/products/ProductCartPage'
import EditOrder from './pages/dashboard/orders/EditOrder'
import OrderDetails from './pages/dashboard/orders/OrderDetails'
import { useEffect, useState } from 'react'
import EmailVerification from './pages/emailVerification/EmailVerification'
import PassReset from './pages/passReset/PassReset'
import { useQuery } from '@apollo/client'
import { ME } from './graphql/query'
import Meeting from './pages/dashboard/meeting/Index'
import FoodDetails from './pages/dashboard/products/FoodDetails'
import CheckPage from './pages/dashboard/checkPage/Index'
import PaymentHistory from './pages/dashboard/payment-history/PaymentHistory'
import StaffsOrder from './pages/dashboard/staffsOrder/Index'

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const { data: user } = useQuery(ME, {
    skip: !token
  });

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={token ? <Navigate to='/dashboard/myside' /> : <Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/email-verification/:token?' element={<EmailVerification />} />
        <Route path='/password-reset/:token?' element={<PassReset />} />
        <Route element={token ? <Layout /> : <Navigate to='/login' />}>
          <Route path='/dashboard/myside' element={<MySide />} />
          {/* <Route path='/dashboard/myside/cart' element={<CartPage />} />
          <Route path='/dashboard/myside/checkout' element={<CheckPage />} /> */}
          <Route path='/dashboard/complete' element={<OrderComplete />} />
          {
            (user?.me.role === 'company-owner' || user?.me.role === 'company-manager') && (
              <>
                <Route path='/dashboard/manage-staff' element={<ManageStaff />} />
                <Route path='/dashboard/meetings' element={<Meeting />} />
              </>
            )
          }
          <Route path='/dashboard/staffs-order' element={<StaffsOrder />} />
          <Route path='/dashboard/products' element={<Products />} />
          <Route path='/dashboard/:path/products/:id' element={<FoodDetails />} />
          {
            !user?.me.company?.isBlocked &&
            <>
              <Route path='/dashboard/products/cart' element={<ProductCartPage />} />
              <Route path='/dashboard/products/checkout' element={<CheckPage />} />
            </>
          }
          <Route path='/dashboard/orders' element={<Orders />} />
          <Route path='/dashboard/payments-history' element={<PaymentHistory />} />
          <Route path='/dashboard/orders/details/:id' element={<OrderDetails />} />
          <Route path='/dashboard/orders/edit/:id' element={<EditOrder />} />
          <Route path='/dashboard/setting' element={<Setting />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
