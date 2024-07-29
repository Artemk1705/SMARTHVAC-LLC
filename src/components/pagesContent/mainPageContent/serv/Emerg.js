import Navbar from "../../../layout/navbar";
import Footer from "../../../layout/footer";
import { useEffect } from "react";

function Emerg() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="sched_body">
        <div className="sched">
          <h2 className="main_service">Emergency service</h2>
          <a href="https://calendly.com/smarthvacus/emergency-service-call">
            <h2 className="button">Get Schedule</h2>
          </a>
        </div>
        <div className="serv_content">
          <div className="p_service1">
            <p>
              Introducing "Smart HVAC" - your reliable heating, ventilation, and
              air conditioning (HVAC) service provider offering top-notch
              Emergency service. Our expert technicians are equipped with
              cutting-edge technology and industry knowledge to tackle urgent
              HVAC issues promptly and efficiently.
            </p>
          </div>
          <div className="p_service2">
            <p>
              When it comes to Emergency service, we understand that certain
              situations require immediate attention to restore comfort and
              ensure the safety of your home or business. Here are some cases in
              which it is worth ordering our Emergency service:
            </p>
          </div>

          <div className="p_service1">
            <p>
              {" "}
              Complete System Failure: If your HVAC system suddenly stops
              working altogether, leaving you without heating or cooling, it is
              crucial to request Emergency service. Our technicians will swiftly
              diagnose the problem, repair any critical issues, and restore your
              system to optimal functionality.
            </p>
          </div>
          <div className="p_service2">
            <p>
              {" "}
              Extreme Temperature Fluctuations: If your HVAC system is
              struggling to maintain a consistent temperature, resulting in
              unbearable heat or freezing cold, it's time to call for Emergency
              service. We will promptly identify the underlying cause, perform
              necessary repairs, and restore comfortable indoor conditions.
            </p>
          </div>
          <div className="p_service1">
            <p>
              Gas or Refrigerant Leaks: The presence of gas or refrigerant leaks
              poses serious health risks and requires immediate attention. If
              you notice a distinct odor or suspect a leak in your HVAC system,
              our Emergency service is available to quickly address the issue,
              seal the leak, and ensure the safety of your premises.
            </p>
          </div>
          <div className="p_service2">
            <p>
              Electrical Malfunctions: Faulty electrical components within your
              HVAC system can lead to potential hazards, such as short circuits
              or fires. If you experience frequent power surges, flickering
              lights, or unusual electrical behavior, it is highly recommended
              to opt for our Emergency service to prevent further damage and
              mitigate safety risks.
            </p>
          </div>
          <div className="p_service1">
            <p>
              Unusual Noises or Smells: Strange noises or odors emanating from
              your HVAC system can indicate mechanical issues, blockages, or
              other problems that require immediate attention. Our technicians
              are trained to diagnose and rectify these issues promptly,
              restoring peace and comfort to your living or working environment.
            </p>
          </div>
          <div className="p_service2">
            <p>
              System Malfunctions during Extreme Weather: When extreme weather
              conditions strike, such as intense heatwaves or frigid
              temperatures, the failure of your HVAC system can have severe
              consequences. Ordering our Emergency service ensures rapid
              response to restore climate control, protecting your family or
              employees from discomfort or health hazards.
            </p>
          </div>
          <div className="p_service1">
            <p>
              At "Smart HVAC," we prioritize your safety, comfort, and peace of
              mind. Our Emergency service is available 24/7, so you can rely on
              our dedicated team to swiftly address any urgent HVAC issues you
              may encounter. Contact us immediately if you experience any of the
              aforementioned situations, and our skilled technicians will be on
              their way to provide efficient solutions and restore your HVAC
              system to optimal performance.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Emerg;
