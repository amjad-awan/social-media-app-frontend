import React, { useState } from "react";

import ShareModal from "../ShareModal/ShareModal";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import NavIcon from "../NavIcon/NavIcon";
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      {/* <div className="navIcon">
        <Link to="../home"><img src={Home} alt="" /></Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div> */}
      <NavIcon/>
      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
