import { useEffect } from "react";
import Navbar from "../layout/navbar";
import "../../assets/styles/index.css";
import Footer from "../layout/footer";
import Aboutpage from "../pagesContent/aboutPageContent/aboutmain";
import "../../assets/styles/About.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <Aboutpage />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default About;
