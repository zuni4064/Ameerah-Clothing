import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import "./index.css";
import AppLayout from "@/routes/AppLayout";
import HomePage from "@/pages/HomePage";
import AllProductsPage from "@/pages/AllProductsPage";
import CollectionsPage from "@/pages/CollectionsPage";
import NewArrivalsPage from "@/pages/NewArrivalsPage";
import SalePage from "@/pages/SalePage";
import EidFestivePage from "@/pages/EidFestivePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderPage from "@/pages/OrderPage";
import LookbookPage from "@/pages/LookbookPage";
import CraftsmanshipPage from "@/pages/CraftsmanshipPage";
import SizeGuidePage from "@/pages/SizeGuidePage";
import ShippingReturnsPage from "@/pages/ShippingReturnsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminGuard from "@/components/AdminGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <AllProductsPage /> },
      { path: "collections", element: <CollectionsPage /> },
      { path: "new-arrivals", element: <NewArrivalsPage /> },
      { path: "sale", element: <SalePage /> },
      { path: "eid-festive", element: <EidFestivePage /> },
      { path: "lookbook", element: <LookbookPage /> },
      { path: "craftsmanship", element: <CraftsmanshipPage /> },
      { path: "size-guide", element: <SizeGuidePage /> },
      { path: "shipping-returns", element: <ShippingReturnsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "terms", element: <TermsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "admin", element: <AdminGuard><AdminDashboardPage /></AdminGuard> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "order/:id", element: <OrderPage /> },
      { path: "all-products", element: <Navigate to="/products" replace /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>,
);
