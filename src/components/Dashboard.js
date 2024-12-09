import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();

    const exitFunc = () => {
        localStorage.removeItem("token");
        navigate("/");    
    }



    return (<div className="root-div">
        <div className="header-grid">
            <div className="header-label-div">
                <h2 className="header-label-h2">
                Страница расчёта параметров прогнозирования при наклонно-направленном бурении для точки замера
                </h2>
            </div>
            <div className="exit-button-div">
                <button className="default-button-exit" onClick={exitFunc}>Выйти</button>
            </div>
        </div>
        <div className="main-div">
          <h3 className="choose-param-label-h3">
            Выберите параметр:
          </h3>
  
          <div className="responsive-grid">
            <button className="default-button" onClick={() => {navigate("/dashboard/calcAngle")}}>Угол наклона отклонителя</button>
            <button className="default-button" onClick={() => {navigate("/dashboard/calcVertical")}}>Вертикаль</button>
            <button className="default-button" onClick={() => {navigate("/dashboard/calcIntensity")}}>Пространственная интенсивность</button>
            <button className="default-button" onClick={() => {navigate("/dashboard/calcAzimuth")}}>Рабочий Азимут</button>
          </div>
            
        </div>
      </div>
      );
}

  




export default Dashboard; 