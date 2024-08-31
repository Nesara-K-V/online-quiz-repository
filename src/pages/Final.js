import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../redux/actions";
import "./Final.css"; // Import the CSS file

const FinalScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score, name } = useSelector((state) => state.quiz);

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    navigate("/");
  };

  return (
    <div className="final-screen">
      <h2>{name}</h2>
      <h3 className="final-score">
        Final Score: {score}
      </h3>
      <button onClick={handleBackToSettings} className="back-button">
        Back to Settings
      </button>
    </div>
  );
};

export default FinalScreen;
