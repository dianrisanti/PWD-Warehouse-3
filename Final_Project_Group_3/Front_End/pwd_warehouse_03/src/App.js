import React from 'react'
import { Switch, Route } from 'react-router-dom'

// import component
import Navigation from './components/navbar'
import Footer from './components/footer'

// import pages
import Home from './pages/home'
import SignUp from './pages/Sign_Up'
import ForgotPassword from './pages/forgotPassword'
import RequestNewPassword from './pages/requestNewPassword'
import Verify from './pages/verification'
import ProductDetail from './pages/productDetail'
import NotFound from './pages/404_page'
import Login from './pages/login'
import CartPage from './pages/cart'
import Profile from './pages/profile'
import History from './pages/history'
import Checkout from './pages/checkout'
import PaymentConfirmation from './pages/UploadPayment'
import WarehouseStock from './pages/warehouseStock'

import GetAll from './pages/admin_product'
import GetJakarta from './pages/admin_jakarta'
import GetMedan from './pages/admin_medan'
import GetSurabaya from './pages/admin_surabaya'
import GetCategory from './pages/admin_category'

import { useDispatch, useSelector } from 'react-redux'

import { getProduct, getCarousel, keepLogin } from './actions'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getProduct())
    dispatch(getCarousel())
    dispatch(keepLogin())
  }, [])
  
  return (
        <div>
            <Navigation />
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/register' component={SignUp} />
                <Route path='/forgot_password' component={ForgotPassword} />
                <Route path='/requestNewPassword' component={RequestNewPassword} />
                <Route path='/verification' component={Verify} />
                <Route path='/login' component={Login} />
                <Route path='/detail' component={ProductDetail}/>
                <Route path='/cart' component={CartPage}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/history' component={History}/>
                <Route path='/checkout' component={Checkout}/>
                <Route path='/upload_payment' component={PaymentConfirmation}/>
                <Route path='/warehouse_stock' component={WarehouseStock}/>

                <Route path='/get_all' component={GetAll}/>
                <Route path='/get_jakarta' component={GetJakarta}/>
                <Route path='/get_medan' component={GetMedan}/>
                <Route path='/get_surabaya' component={GetSurabaya}/>
                <Route path='/get_category' component={GetCategory}/>
                
                <Route path='*' component={NotFound} />
            </Switch>
            <Footer/>
        </div>
  )
}

export default App