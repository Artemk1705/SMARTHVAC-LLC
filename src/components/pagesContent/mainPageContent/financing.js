import Synchrony from "../../../assets/images/LogosPartners/synclogo.png";
import FinancePhot from "../../../assets/images/FinancePic.jpg";

export default function Fincaning() {
  return (
    <dev classname="finance_block">
      <h2 className="finance_title">
        Expand your purchasing power with Promotional Financing through
        Synchrony
      </h2>
      <div className="finance_container">
        <img src={FinancePhot} className="finance_photo" alt="Conditioners" />
        <div className="finance_par">
          <img src={Synchrony} className="synchony_logo" alt="Synchrony Logo" />
          <div className="finance_text">
            <p className="finance_p">
              Synchorny is one of the nation`s premier consumer financial
              services companies. Our roots in consumer finance trace back to
              1932, and today they are the largest provider of private label
              credit cards in the United States based on purchase volume and
              receivables.
            </p>
            <ul className="finance_list">
              <li className="finance_stroke">
                A simple application process, and fast credit decisions.
              </li>
              <li className="finance_stroke">
                Unsecured, revolving credit lines.
              </li>
              <li className="finance_stroke">Promotional financing options</li>
              <li className="finance_stroke">
                Convenient monthly payment options
              </li>
              <li className="finance_stroke">Online account managment</li>
            </ul>
          </div>
          <div className="finance_button">
            <a href="https://www.mysynchrony.com/mmc/S6228322207">
              APPLY ONLINE
            </a>
          </div>
        </div>
      </div>
    </dev>
  );
}
