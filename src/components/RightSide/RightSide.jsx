import React, { useState } from "react";
import Comment from "../../img/comment.png";
import Noti from "../../img/noti.png";
import Home from "../../img/home.png";
import { UilSetting } from "@iconscout/react-unicons";
import ShareModal from "../ShareModal/ShareModal";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import {Link} from "react-router-dom"
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcon">
        <Link to="../home"><img src={Home} alt="" /></Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div>
      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
