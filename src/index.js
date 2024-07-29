import React from "react";
import ReactDOM from "react-dom/client";
import amplifyconfig from "./amplifyconfiguration.json";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import "./assets/styles/index.css";
import Mainpage from "./components/pages/mainpage";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Careers from "./components/pages/careers";
import Servform from "./components/pagesContent/careersPageContent/careerforms/servform";
import Schedule from "./components/pages/schedule";
import Financing from "./components/pages/financing";
import Products from "./components/pages/porducts";
import MaintenancePlan from "./components/pages/mainPlan";
import Acmaintenance from "./components/pagesContent/mainPageContent/serv/AC_M";
import Acrep from "./components/pagesContent/mainPageContent/serv/Ac_repl";
import Acrepl from "./components/pagesContent/mainPageContent/serv/Ac_repl";
import Mininst from "./components/pagesContent/mainPageContent/serv/Minspinst";
import Minrep from "./components/pagesContent/mainPageContent/serv/Minsprep";
import Furrep from "./components/pagesContent/mainPageContent/serv/Furrep";
import Fur from "./components/pagesContent/mainPageContent/serv/Fur";
import Maint from "./components/pagesContent/mainPageContent/serv/Maint";
import Emerg from "./components/pagesContent/mainPageContent/serv/Emerg";

Amplify.configure(amplifyconfig);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Financing" element={<Financing />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/MaintenancePlan" element={<MaintenancePlan />} />
        <Route path="/careerforms/Servform" element={<Servform />} />
        <Route path="/serv/AC_M" element={<Acmaintenance />} />
        <Route path="/serv/AC_rep" element={<Acrep />} />
        <Route path="/serv/AC_repl" element={<Acrepl />} />
        <Route path="/serv/Minspinst" element={<Mininst />} />
        <Route path="/serv/Minsprep" element={<Minrep />} />
        <Route path="/serv/Furrep" element={<Furrep />} />
        <Route path="/serv/Fur" element={<Fur />} />
        <Route path="/serv/Maint" element={<Maint />} />
        <Route path="/serv/Emerg" element={<Emerg />} />
      </Routes>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter
      basename={process.env.PUBLIC_URL}
      onPopState={() => window.scrollTo(0, 0)}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
