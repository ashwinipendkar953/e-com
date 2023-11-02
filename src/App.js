import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <CategoryProvider>
      <ProductProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/category-page/:catName/:catId"
              element={<CategoryPage />}
            />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
        <Footer />
      </ProductProvider>
    </CategoryProvider>
  );
}

export default App;
