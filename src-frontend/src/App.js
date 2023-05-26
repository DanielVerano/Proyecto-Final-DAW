import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartPage, CheckoutPage, DashboardPage, ErrorPage, HomePage, LoginPage, LogoutPage, ProductsPage, ProtectedRoute, RegisterPage, SingleProductPage, AdminPage, EditPasswordPage } from './pages'
import { Footer, Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/editPassword" element={
            <ProtectedRoute>
              <EditPasswordPage />
            </ProtectedRoute>
          } />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="admin/*" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App;