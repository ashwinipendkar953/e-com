import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";

function App() {
  return (
    <CategoryProvider>
      <ProductProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="/category-page/:catName/:catId"
              element={<CategoryPage />}
            />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
        <Footer />
      </ProductProvider>
    </CategoryProvider>
  );
}

export default App;
