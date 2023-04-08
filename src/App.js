import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage, { loader as detailPageLoader } from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./pages/RootLayout";

function App() {
  // create Browser Router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/shop", element: <ShopPage /> },
        {
          path: "/detail/:productId",
          id: "detail-page",
          element: <DetailPage />,
          loader: detailPageLoader,
        },
        { path: "/cart", element: <CartPage /> },
        { path: "/checkout", element: <CheckOutPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
