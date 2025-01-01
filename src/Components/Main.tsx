import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './authentication/Login/Login'
import { AuthProvider } from '../Contexts/AuthContext'
import PrivateRoute from '../Contexts/PrivateRoute'
import ClientDashboard from './authentication/client/Dashboard/ClientDashboard'
import AdminDashboard from './authentication/admin/Dashboard/AdminDashboard'


export default class Main extends Component {
  render() {
    return (
      <div>
        <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/client-dashboard" element={<PrivateRoute client={<ClientDashboard />} />} />
              <Route path="/admin-dashboard" element={<PrivateRoute staff={<AdminDashboard />} />} />
            </Routes>
        </AuthProvider>
      </div>
    )
  }
}
