import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Posinst() {
  const [isBlockVisible, setIsBlockVisible] = useState(false);
  const [isBlockRendered, setIsBlockRendered] = useState(false);
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      setBlockHeight(windowHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDivClick = () => {
    if (!isBlockVisible) {
      setIsBlockRendered(true);
      setTimeout(() => {
        setIsBlockVisible(true);
      }, 20);
    }
  };

  const handleCloseClick = (event) => {
    event.stopPropagation();
    setIsBlockVisible(false);
    setTimeout(() => {
      setIsBlockRendered(false);
    }, 1000);
  };

  return (
    <div className="air_pos">
      <div className="position">
        <h4 className="position_title">HVAC installer</h4>
        <p className="position_p">
          Tasked with the installation and proper connection of air conditioning
          units.
        </p>
        <button onClick={handleDivClick} className="info-button">
          MORE
        </button>
      </div>
      {isBlockRendered && (
        <div className={`block ${isBlockVisible ? "visible" : ""}`}>
          <div onClick={handleCloseClick} className="close-button"></div>
          <div className="block-content">
            <div>
              <h4 className="full_header">Endless possibilities</h4>
              <p className="full_pa">
                I am excited to introduce you to ChatGPT - an innovative
                artificial intelligence technology that can help you find
                answers to all your questions. Whether you need information on
                the latest news, travel tips, or even just some entertaining
                jokes, ChatGPT is always ready to assist.
              </p>
              <p className="full_pa">
                Paragraph 1: ChatGPT is not just an ordinary chatbot. It is
                based on cutting-edge technology developed by the OpenAI team
                and possesses a vast knowledge base collected from various
                sources. This enables it to provide you with accurate and
                high-quality answers to a wide range of questions.
              </p>
              <p className="full_pa">
                Paragraph 2: But what makes ChatGPT truly remarkable is its
                ability to learn. You can ask questions sequentially, edit them,
                and receive new, more precise answers. ChatGPT adapts to your
                needs and improves its responses based on your feedback. This
                means that with each interaction, it becomes more accurate and
                helpful.
              </p>
              <p className="full_pa">
                {" "}
                Paragraph 3: ChatGPT can also accomplish incredible things when
                used with a creative approach. It can assist you in generating
                unique texts, developing creative ideas, or even aiding in
                writing articles and news for your website. Just ask questions
                and share your ideas, and ChatGPT will work alongside you to
                achieve astonishing results.
              </p>
              <p className="full_pa">
                {" "}
                Conclusion: Don't miss out on the benefits of using ChatGPT on
                our website. It is ready to help you with any questions and
                tasks, offering flexibility and the ability to improve with each
                interaction. Try ChatGPT today and discover a world of new
                possibilities and incredible outcomes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Posinst;
