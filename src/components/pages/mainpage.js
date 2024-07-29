import { useEffect } from "react";
import Navbar from "../layout/navbar";
import Main from "../../components/pagesContent/mainPageContent/main";
import "../../assets/styles/index.css";
import "../../assets/styles/serv.css";
import "../../assets/styles/footer.css";

function Mainpage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="App">
      <Navbar />
      <div>
        <Main />
      </div>
    </div>
  );
}

export default Mainpage;
