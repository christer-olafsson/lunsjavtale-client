import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ME } from './graphql/query'
import { useEffect, useState } from 'react'
import { lazy } from 'react'
import { Suspense } from 'react'
import ProtectedRoutes from './components/ProtectedRoutes'
import Loader from './common/loader/Index'

const Home = lazy(() => import('./pages/home/Home'));
const Login = lazy(() => import('./pages/login/Login'));
const Search = lazy(() => import('./pages/search/Search'));
const NotFound = lazy(() => import('./pages/notFound/Index'));
const Layout = lazy(() => import('./pages/dashboard/Layout'));
const Products = lazy(() => import('./pages/dashboard/products/Products'));
const Cart = lazy(() => import('./pages/dashboard/cart/Cart'));
const Notifications = lazy(() => import('./pages/dashboard/notification/Notifications'));
const StaffDetails = lazy(() => import('./pages/dashboard/manageStaff/StaffDetails'));
const StaffsOrder = lazy(() => import('./pages/dashboard/staffsOrder/Index'));
const ProductCartPage = lazy(() => import('./pages/dashboard/products/ProductCartPage'));
const CheckPage = lazy(() => import('./pages/dashboard/checkPage/Index'));
const Orders = lazy(() => import('./pages/dashboard/orders/Orders'));
const OrderDetails = lazy(() => import('./pages/dashboard/orders/OrderDetails'));
const EditOrder = lazy(() => import('./pages/dashboard/orders/EditOrder'));
const PaymentSuccess = lazy(() => import('./pages/dashboard/payment/PaymentSuccess'));
const PaymentHistory = lazy(() => import('./pages/dashboard/payment-history/PaymentHistory'));
const Setting = lazy(() => import('./pages/dashboard/setting/Setting'));
const EmailVerification = lazy(() => import('./pages/emailVerification/EmailVerification'));
const PassReset = lazy(() => import('./pages/passReset/PassReset'));


const LazyLoad = ({ component: Component }) => (
  <Suspense fallback={<div><Loader /></div>}>
    <Component />
  </Suspense>
)

function App() {

  const [token, setToken] = useState(localStorage.getItem('lunsjavtale'));
  const { data: user, loading } = useQuery(ME, {
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
    <Routes>
      <Route path='/' element={<LazyLoad component={Home} />} />
      <Route path='/login' element={token ? <Navigate to='/dashboard/products' /> : <LazyLoad component={Login} />} />
      <Route path='/search' element={<LazyLoad component={Search} />} />
      <Route path='/email-verification/:token?' element={<LazyLoad component={EmailVerification} />} />
      <Route path='/password-reset/:token?' element={<LazyLoad component={PassReset} />} />
      <Route element={token ? <LazyLoad component={Layout} /> : <Navigate to='/login' />}>
        <Route path='/dashboard' element={<Navigate to='/dashboard/products' />} />
        <Route path='/dashboard/cart' element={<LazyLoad component={Cart} />} />
        <Route path='/dashboard/notifications' element={<LazyLoad component={Notifications} />} />
        <Route path='/dashboard/staff-details/:id' element={<LazyLoad component={StaffDetails} />} />
        <Route path='/dashboard/staffs-order' element={<LazyLoad component={StaffsOrder} />} />
        <Route path='/dashboard/products' element={<LazyLoad component={Products} />} />
        <Route path='/dashboard/products/cart' element={<LazyLoad component={ProductCartPage} />} />
        <Route path='/dashboard/products/checkout' element={<LazyLoad component={CheckPage} />} />
        <Route path='/dashboard/*' element={<ProtectedRoutes user={user} loading={loading} />} />
        <Route path='/dashboard/orders' element={<LazyLoad component={Orders} />} />
        <Route path='/dashboard/payment-success' element={<LazyLoad component={PaymentSuccess} />} />
        <Route path='/dashboard/payments-history' element={<LazyLoad component={PaymentHistory} />} />
        <Route path='/dashboard/orders/details/:id' element={<LazyLoad component={OrderDetails} />} />
        <Route path='/dashboard/orders/edit/:id' element={<LazyLoad component={EditOrder} />} />
        <Route path='/dashboard/setting' element={<LazyLoad component={Setting} />} />
      </Route>
      <Route path='*' element={<LazyLoad component={NotFound} />} />
    </Routes>
  )
}

export default App
