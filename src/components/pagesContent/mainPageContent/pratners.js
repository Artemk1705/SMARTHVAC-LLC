import American from "../../../assets/images/LogosPartners/Americanlogo.png";
import York from "../../../assets/images/LogosPartners/YorkLogo.jpg";
import Clark from "../../../assets/images/LogosPartners/ClarkLogo.jpg";
import Nate from "../../../assets/images/LogosPartners/nateLogo.png";
import Mitsu from "../../../assets/images/LogosPartners/MitsuLogo.png";
import EnergTrust from "../../../assets/images/LogosPartners/energTrustLogo.png";
import Ameristar from "../../../assets/images/LogosPartners/Ameristarlogo.png";
import Better from "../../../assets/images/LogosPartners/Betterlogo.png";

export default function PartnersBlock() {
  return (
    <div className="partners_container">
      <div className="logos_block">
        <div className="upper_block">
          <img src={York} className="logo_partners" alt="York" />
          <img src={Clark} className="logo_partners" alt="Clark Public" />
          <img src={Mitsu} className="logo_partners" alt="Mitsubishi" />
          <img src={Nate} className="logo_partners" alt="Nate" />
          <img src={EnergTrust} className="logo_partners" alt="Nate" />
        </div>
        <div className="lower_block">
          <img
            src={American}
            className="logo_partners"
            alt="Amercian Standart"
          />
          <img
            src={Ameristar}
            className="logo_partners"
            alt="Amercian Standart"
          />
          <img src={Better} className="logo_partners" alt="Amercian Standart" />
        </div>
      </div>
    </div>
  );
}
