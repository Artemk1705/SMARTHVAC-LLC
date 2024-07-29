import gmail from "../../../assets/images/LogoFooter/Gmail.png";
import faceb from "../../../assets/images/LogoFooter/Facebook.png";
import insta from "../../../assets/images/LogoFooter/Instagram.png";
import MapGoogle from "./googlemap";

function Contactmain() {
  return (
    <div className="contact_page">
      <div className="contact_content">
        <div className="contact_information">
          <h2>Contact Information</h2>
          <div className="contact_bubble">
            <h4>Address</h4>
            <p>9511 NE 106th St, Vancouver, WA 98662</p>
          </div>
          <div className="contact_bubble">
            <h4>Phone</h4>
            <p>+1 (360) 921-3233</p>
          </div>
          <div className="contact_bubble">
            <h4>Working Hours</h4>
            <p>Regular business hours Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p>Emergency service - 24/7/365 </p>
          </div>
          <div className="contact_bubble">
            <h4>Feedback</h4>
            <p>
              Dear customers, your feedback is important to us! If you have any
              questions, comments, or inquiries, please fill out the contact
              form or reach out to us using the contact details provided above.
              We will be happy to answer all your questions and provide the
              necessary information.
            </p>
          </div>
          <h3>Thank you for your interest in our SMART HVAC company</h3>
        </div>
        <div className="second_container_contact">
          <div className="social_networks">
            <h2 className="social_title">Our social networks</h2>
            <div className="social_icons">
              <a href="mailto:SmartHvacUS@gmail.com">
                <img className="gmail" src={gmail} alt="Gmail" />
              </a>
              <a href="https://www.instagram.com/smart_hvac_us/">
                <img className="instagram" src={insta} alt="Instagramm" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100090354312907">
                <img className="facebook" src={faceb} alt="Facebook" />
              </a>
            </div>
          </div>
          <div className="map_content">
            <h2 className="map_title">Easy to find us</h2>
            <div className="map_frame">
              <MapGoogle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactmain;
