import { useEffect } from "react";
import Footer from "../layout/footer";
import Navbar from "../layout/navbar";
import QuestionForm from "../pagesContent/scgedulePageContent/scheduleQuestions";
import "../../assets/styles/index.css";
import "../../assets/styles/schedule.css";

function Schedule() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contact">
      <Navbar />
      <div>
        <div>
          <QuestionForm />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Schedule;
