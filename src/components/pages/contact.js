import { useEffect } from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import Contactmain from "../pagesContent/contactPageContent/contactmain";
import "../../assets/styles/index.css";
import "../../assets/styles/Contact.css";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contact">
      <Navbar />
      <Contactmain />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
