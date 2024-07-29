import { useEffect } from "react";
import Navbar from "../layout/navbar";
import Footer from "../layout/footer";
import Careersmain from "../pagesContent/careersPageContent/careersmain";
import "../../assets/styles/index.css";
import "../../assets/styles/About.css";
import "../../assets/styles/careers.css";

function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="career_page">
      <Navbar />
      <div>
        <Careersmain />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Careers;
