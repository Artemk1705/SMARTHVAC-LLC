import React, { useState, useEffect } from "react";

const reviews = [
  {
    text: " Dean Long - Incredible hard working crew. Our HVAC was over 20 years old. They replaced everything! All new more efficient York systems! Works fantastic. Great job!!",
  },
  {
    text: " usdoomtrooper - Positive: Professionalism, Punctuality, Quality, Responsiveness, Value On time respect very helpful explained everything to me when I had a question would recommend Service: A/C system maintenance ",
  },
  {
    text: " Molly Fitzpatrick - Positive: Professionalism, Punctuality, Quality, Responsiveness, Value technician was able to come same day and diagnosed and repaired my system in less than an hour.  Highly recommend!",
  },
  {
    text: " Daniel Farrar - Excellent service! Alex was on time for the appointment, and very friendly. Charged my central ac unit and the cost was very fair. Highly recommend and will call them the next time I need service.",
  },
  {
    text: " Jack Nugent - Smart HVAC was on the site the next day, as scheduled. My gas furnace was due for a maintenance. Alex was very professional as he maintained the furnace and changed out the furnace filter. I am very content with his services.",
  },
  {
    text: " Kevin Alvord - Positive: Professionalism, Quality, Responsiveness The repair person who came and fixed my AC was very professional and fixed the problem quickly. Thanks for the great work.",
  },
  {
    text: " Pete Quinn - Alex was awesome. He explained things thoroughly, provided options and I noticed his attention to detail throughout the installation Highly recommend",
  },
  {
    text: " Jesús Soltero - Alex and his team did a great job replacing my furnace and heat pump. They offered a fair price and good quality.",
  },
  {
    text: " Vincent S - Alex at Smart HVAC is excellent!  We had an emergency furnace problem and he was at our home the same day to complete repairs and get our heat back on.  Thank you!",
  },
];

const ReviewBlock = () => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        const increment = isMobile ? 1 : 3;
        setCurrentStartIndex((currentStartIndex + increment) % reviews.length);
        setFading(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStartIndex, isMobile]);

  const displayedReviews = reviews.slice(
    currentStartIndex,
    currentStartIndex + (isMobile ? 1 : 3)
  );

  return (
    <div className="review-block">
      {displayedReviews.map((review, index) => (
        <div key={index} className={`review ${fading ? "fading" : ""}`}>
          {review.text}
        </div>
      ))}
    </div>
  );
};

export default ReviewBlock;
