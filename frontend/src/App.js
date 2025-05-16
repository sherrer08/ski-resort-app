import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import 'leaflet/dist/leaflet.css';

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Resort from './pages/Resort';
import Trails from './pages/Trails';
import Reports from './pages/Conditions';
import Login from './pages/Login';
import CreateReport from './pages/CreateCondition';
import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './pages/Favorites';
import SignUp from './pages/SignUp';
import AdminRoute from './components/AdminRoute';
import AddResort from './pages/AddResort';
import AddTrail from './pages/AddTrail';
import UpdateLiftStatus from './pages/UpdateLift';

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <BrowserRouter>
      <UserProvider>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element = {<Home />}
            />
            <Route
              path='api/resorts/:id'
              element = {<Resort />}
            />
            <Route
              path='api/trails/resort/:resortId'
              element = {<Trails />}
            />
            <Route 
              path='api/conditions/:resortId'
              element = {<Reports />}
            />
            <Route 
              path='/login'
              element = {<Login />}
            />
            <Route
              path='api/conditions'
              element= {
                <PrivateRoute>
                  <CreateReport />
                </PrivateRoute>
              }
            />
            <Route
              path='/favorites'
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route 
              path='/signup'
              element={<SignUp />}
            />
            <Route 
              path='/add-resort'
              element={
                <AdminRoute>
                  <AddResort />
                </AdminRoute>
              }
            />
            <Route 
              path='/add-trail'
              element={
                <AdminRoute>
                  <AddTrail />
                </AdminRoute>
              }
            />
            <Route 
              path='/update-lift/:resortId/:liftId'
              element={
                <AdminRoute>
                  <UpdateLiftStatus />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </UserProvider>
      </BrowserRouter>
    </div>
    </ApolloProvider>
  );
}

export default App
