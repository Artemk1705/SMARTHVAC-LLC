import { useEffect } from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import CartPage from "../pagesContent/cartContent/cartPage";

export default function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="career_page">
      <Navbar />
      <CartPage />
      <Footer />
    </div>
  );
}
