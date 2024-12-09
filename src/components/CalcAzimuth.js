import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import "./Calc.css"

function CalcAzimuth(){
    const navigate = useNavigate();
    const [result, setResult] = useState("нет результата");


    const backFunc = () => {
        navigate("/dashboard");    
    }


    return (<div className="root-div">
        <div className="header-grid">
            <div className="header-label-div">
                <h2 className="header-label-h2">
                Расчёт азимута
                </h2>
            </div>
            <div className="exit-button-div">
                <button className="default-button-exit" onClick={backFunc}>Назад</button>
            </div>
        </div>
        <div className="main-div">
          <h3 className="choose-param-label-h3">
            Введите параметры:
          </h3>
  
          <div className="form-and-result-grid">
            <form className="calc-form left-allign">
              <div className="calc-label-div">
                <label htmlFor="instensityPredicted" className="calc-label">
                  Введите предсказываемую пространстенную интенсивность, гр/м2
                </label>
              </div>
              <input id="instensityPredicted" className="calc-input"/>
              
              <div className="calc-label-div">
                <label htmlFor="pointOfMeasurePredicted"className="calc-label">
                  Введите предсказываемую точку замера, м
                </label>
              </div>
              <input id="pointOfMeasurePredicted" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="tfFact">
                  Введите направление искревления скважины, гр
                  </label>
              </div>
              <input id="tfFact" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="anglePredicted">Введите предсказываемый угол наклона, град</label>
              </div>
              <input id="anglePredicted" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasureFact">Введите фактичекую точку замера, м</label>
              </div>
              <input id="pointOfMeasureFact" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="azimuthFact">Введите фактический азимут, гр</label>
              </div>
              <input id="azimuthFact" className="calc-input"/>
              
              <div className="calc-label-div">
                <label htmlFor="angleFact">Введите угол наклона фактический, гр</label>
              </div>
              <input id="angleFact" className="calc-input"/>

              <div className="calc-submit-button-div">
                <button type="submit" className="calc-submit-button">
                  Рассчитать азимут
                </button>
              </div>
            </form>
            <div className="calc-result-div">
              <p className="calc-result-p">Результат</p>
              <p className="calc-result-p">{result}</p>
            </div>
          </div>
            
        </div>
      </div>
      );
}

export default CalcAzimuth; 