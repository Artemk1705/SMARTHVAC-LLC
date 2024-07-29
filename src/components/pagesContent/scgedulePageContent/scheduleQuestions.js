import React, { useState } from "react";
import Questions from "./questionsPage";

function QuestionForm() {
  const [title, setTitle] = useState("What we can do for you?");
  return (
    <div className="sch_page">
      <div className="sch_content">
        <div className="sch_titles">
          <h2>{title}</h2>
          <h3>Heating & Air Conditioning</h3>
        </div>
        <Questions onTitleChange={setTitle} />
      </div>
    </div>
  );
}

export default QuestionForm;
