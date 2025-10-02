import { BrowserRouter as Router, Routes, Route } from 'react-router'
import SignIn from './pages/AuthPages/SignIn'
import SignUp from './pages/AuthPages/SignUp'
import NotFound from './pages/OtherPage/NotFound'
import AppLayout from './layout/AppLayout'
import { ScrollToTop } from './components/common/ScrollToTop'
import Home from './pages/Dashboard/Home'
import ProtectedRoute from './components/common/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import IndexRoles from './pages/Roles/Index'
import UserManagement from './pages/User/UserManagement'
import IndexMenus from './pages/Menu/Index'
import IndexRoleAkses from './pages/RoleAkses/Index'

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            zIndex: 999,
          },
          duration: 5000,
        }}
      />

      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/settings/role"
              element={
                <ProtectedRoute>
                  <IndexRoles />
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/settings/general"
              element={
                <ProtectedRoute>
                  <IndexRoles />
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/settings/roleAkses"
              element={
                <ProtectedRoute>
                  <IndexRoleAkses />
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/settings/menu"
              element={
                <ProtectedRoute>
                  <IndexMenus />
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/user/index"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/user/logActivity"
              element={
                <ProtectedRoute>
                  <IndexRoles />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}
