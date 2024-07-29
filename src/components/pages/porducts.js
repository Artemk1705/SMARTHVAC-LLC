import { useEffect } from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import "../../assets/styles/index.css";

function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contact">
      <Navbar />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Products;
