import React, { useState } from "react";
import FromSchedule from "./firstForm";

function Questions({ onTitleChange }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showBlockCool, setShowBlockCool] = useState(null);
  const [showBlockTherm, setShowBlockTherm] = useState(null);
  const [showBlockElse, setShowBlockElse] = useState(null);
  const [selectedHeatingBlock, setSelectedHeatingBlock] = useState(null);
  const [prevMainBlock, setPrevMainBlock] = useState(null);

  const [currentBlock, setCurrentBlock] = useState(null);
  const [showSchedBlock, setShowSchedBlock] = useState(false);

  const [serv, setServ] = useState(null);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");

  const handleBlockClick = (block, service) => {
    setIsVisible(false);
    setCurrentBlock(block);
    if (serv === null) {
      setServ(service);
    }

    onTitleChange(`${service} Services`);
  };

  const handleBlockBackClick = () => {
    if (currentBlock) {
      setServ(null);
    }
    setIsVisible(true);
    setCurrentBlock(null);
    onTitleChange("What we can do for you?");
  };

  const handleBlockHitClick = (subBlock) => {
    setSelectedHeatingBlock(subBlock);
    setCurrentBlock(null);
    setPrevMainBlock("Heating");
  };
  const handleBlockCoolClick = (subBlock) => {
    setShowBlockCool(subBlock);
    setCurrentBlock(null);
    setPrevMainBlock("Cooling");
  };
  const handleBlockThermClick = (subBlock) => {
    setShowBlockTherm(subBlock);
    setCurrentBlock(null);
    setPrevMainBlock("Thermostat");
  };
  const handleBlockElseClick = (subBlock) => {
    setShowBlockElse(subBlock);
    setCurrentBlock(null);
    setPrevMainBlock("Something Else");
  };

  const handleBlockBackHitClick = (subBlock) => {
    setCurrentBlock(subBlock);
    setSelectedHeatingBlock(null);
  };
  const handleBlockBackCoolClick = (subBlock) => {
    setShowBlockCool(null);
    setCurrentBlock(subBlock);
  };
  const handleBlockBackThermClick = (subBlock) => {
    setShowBlockTherm(null);
    setCurrentBlock(subBlock);
  };
  const handleBlockBackElseClick = (subBlock) => {
    setShowBlockElse(null);
    setCurrentBlock(subBlock);
  };
  const handleBlockForm = (title) => {
    setCurrentBlock(null);
    setShowSchedBlock(true);
    setSelectedServiceTitle(title);
    setSelectedHeatingBlock(null);
    setShowBlockCool(null);
    setShowBlockTherm(null);
    setShowBlockElse(null);
  };
  const handleBlockBackForm = () => {
    setShowSchedBlock(null);
    if (prevMainBlock === "Cooling") {
      setShowBlockCool(true);
    } else if (prevMainBlock === "Thermostat") {
      setShowBlockTherm(true);
    } else if (prevMainBlock === "Something Else") {
      setShowBlockElse(true);
    } else {
      setSelectedHeatingBlock(true);
    }
    setPrevMainBlock(null);
  };

  const blockData = [
    {
      title: "Diagnostic",
      content: "Heating, Cooling, Thermostat, Something Else",
      onClick: () => handleBlockClick("block2", "Diagnostic"),
    },
    {
      title: "Maintenance",
      content: "Heating, Cooling, Thermostat, Something Else",
      onClick: () => handleBlockClick("block3", "Maintenance"),
    },
  ];

  const renderBlocks = () => {
    return blockData.map((block, index) => (
      <div key={index} className="sch_block_1" onClick={block.onClick}>
        <h3>{block.title}</h3>
        <p>{block.content}</p>
      </div>
    ));
  };

  const renderSubBlocks = (subBlockData) => {
    return subBlockData.map((subBlock, index) => (
      <div
        key={index}
        className="sch_block_2"
        onClick={() => {
          if (subBlock.title === "Heating") {
            handleBlockHitClick(subBlock);
          } else if (subBlock.title === "Cooling") {
            handleBlockCoolClick(subBlock);
          } else if (subBlock.title === "Thermostat") {
            handleBlockThermClick(subBlock);
          } else {
            handleBlockElseClick(subBlock);
          }
        }}
      >
        <h3>{subBlock.title}</h3>
        <p>{subBlock.content.replace("{serv}", serv)}</p>
      </div>
    ));
  };

  const renderThirdBlocks = (hitBlockData) => {
    return hitBlockData.map((hitBlock, index) => (
      <div
        key={index}
        className="sch_block_2"
        onClick={() => {
          handleBlockForm(hitBlock.title.replace("{serv}", serv));
        }}
      >
        <h3>{hitBlock.title.replace("{serv}", serv)}</h3>
        <p>{hitBlock.content.replace("{serv}", serv)}</p>
      </div>
    ));
  };

  return (
    <div className="quest_container">
      {isVisible && renderBlocks()}
      {currentBlock && (
        <div>
          {renderSubBlocks([
            {
              title: "Heating",
              content: `Electric Furnace/Heater, Gas Furnace/Heater, Heat Pump, Other`,
            },
            {
              title: "Cooling",
              content: `Air Conditioner / Central Ac, Ductless Mini Split, Portable Ac,  Ptac(Packaged Trminal Ac), Other`,
            },
            { title: "Thermostat", content: `Thermostat` },
            {
              title: "Something Else",
              content: `Air Purification System, Bathroom Exhaust Fan, Other`,
            },
          ])}
          <button className="sch_button" onClick={handleBlockBackClick}>
            BACK
          </button>
        </div>
      )}
      {selectedHeatingBlock && (
        <div>
          {renderThirdBlocks([
            {
              title: `Electric Furnace/Heater`,
              content: `Expert service for electric furnace/heater`,
              onClick: () =>
                handleBlockForm(`${serv} - Electric Furnace/Heater`),
            },
            {
              title: `Gas Furnace/Heater`,
              content: `Expert service for gas furnace/heater`,
            },
            {
              title: `Heat Pump`,
              content: `Expert service for heat pump`,
            },
            {
              title: `Other`,
              content: `Expert service`,
            },
          ])}
          <button className="sch_button" onClick={handleBlockBackHitClick}>
            BACK
          </button>
        </div>
      )}
      {showBlockCool && (
        <div>
          {renderThirdBlocks([
            {
              title: `Air Conditioner / Central AC`,
              content: `Expert service for air conditioner / central AC`,
            },
            {
              title: `Ductless Mini Split`,
              content: `Expert service for ductless mini split`,
            },
            {
              title: `Portable AC`,
              content: `Expert service for portable AC`,
            },
            {
              title: `Ptac(Packaged Therminal AC)`,
              content: `Expert service for PTAC (packaged terminal AC)`,
            },
            {
              title: `Other`,
              content: `Expert service`,
            },
          ])}
          <button className="sch_button" onClick={handleBlockBackCoolClick}>
            BACK
          </button>
        </div>
      )}
      {showBlockTherm && (
        <div>
          {renderThirdBlocks([
            {
              title: `Thermostat`,
              content: `Expert service for thermostat`,
            },
          ])}
          <button className="sch_button" onClick={handleBlockBackThermClick}>
            BACK
          </button>
        </div>
      )}
      {showBlockElse && (
        <div>
          {renderThirdBlocks([
            {
              title: `Air Purification System`,
              content: `Expert service for air purification system`,
            },
            {
              title: `Bathroom Exhaust Fan`,
              content: `Expert service for bathroom exhaust fan`,
            },
            {
              title: `Other`,
              content: `Expert service`,
            },
          ])}
          <button className="sch_button" onClick={handleBlockBackElseClick}>
            BACK
          </button>
        </div>
      )}
      {showSchedBlock && (
        <div>
          <FromSchedule
            onChange={handleBlockBackForm}
            selectedService={selectedServiceTitle}
          />
        </div>
      )}
    </div>
  );
}

export default Questions;
