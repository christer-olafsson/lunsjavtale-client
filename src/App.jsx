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
import ProductCartPage from './pages/dashboard/products/ProductCartPage'
import EditOrder from './pages/dashboard/orders/EditOrder'
import OrderDetails from './pages/dashboard/orders/OrderDetails'
import { useEffect, useState } from 'react'
import EmailVerification from './pages/emailVerification/EmailVerification'
import PassReset from './pages/passReset/PassReset'
import { useQuery } from '@apollo/client'
import { ME } from './graphql/query'
import Meeting from './pages/dashboard/meeting/Index'
import CheckPage from './pages/dashboard/checkPage/Index'
import PaymentHistory from './pages/dashboard/payment-history/PaymentHistory'
import StaffsOrder from './pages/dashboard/staffsOrder/Index'
import Notifications from './pages/dashboard/notification/Notifications'
import StaffDetails from './pages/dashboard/manageStaff/StaffDetails'
import PaymentSuccess from './pages/dashboard/products/PaymentSuccess'

function App() {

  const [token, setToken] = useState(localStorage.getItem('lunsjavtale'));
  const { data: user } = useQuery(ME, {
    skip: !token
  });

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  useEffect(() => {
    setToken(localStorage.getItem('lunsjavtale'))
  }, [])


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={token ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/email-verification/:token?' element={<EmailVerification />} />
        <Route path='/password-reset/:token?' element={<PassReset />} />
        <Route element={token ? <Layout /> : <Navigate to='/login' />}>
          <Route path='/dashboard' element={<MySide />} />
          {/* <Route path='/dashboard/myside/cart' element={<CartPage />} />
          <Route path='/dashboard/myside/checkout' element={<CheckPage />} /> */}
          {
            (user?.me.role === 'company-owner' || user?.me.role === 'company-manager') && (
              <>
                <Route path='/dashboard/manage-staff' element={<ManageStaff />} />
                <Route path='/dashboard/meetings' element={<Meeting />} />
              </>
            )
          }
          <Route path='/dashboard/staff-details/:id' element={<StaffDetails />} />
          <Route path='/dashboard/notifications' element={<Notifications />} />
          <Route path='/dashboard/staffs-order' element={<StaffsOrder />} />
          <Route path='/dashboard/products' element={<Products />} />
          {
            !user?.me.company?.isBlocked &&
            <>
              <Route path='/dashboard/products/cart' element={<ProductCartPage />} />
              <Route path='/dashboard/products/checkout' element={<CheckPage />} />
            </>
          }
          <Route path='/dashboard/orders' element={<Orders />} />
          <Route path='/dashboard/orders/payment-success' element={<PaymentSuccess />} />
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
