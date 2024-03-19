import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/LoginPage/index'
import Home from './components/Home'
import RestaurantDetailed from './components/RestaurantDetailed'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetailed}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
