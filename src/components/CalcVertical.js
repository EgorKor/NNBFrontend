import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import "./Calc.css"

function CalcVertical(){
    const navigate = useNavigate();
    const [result, setResult] = useState("нет результата");
    const backFunc = () => {
        navigate("/dashboard");    
    }


    return (<div className="root-div">
        <div className="header-grid">
            <div className="header-label-div">
                <h2 className="header-label-h2">
                Расчёт вертикали
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
                <label htmlFor="angleFact" className="calc-label">
                  Введите предсказываемый угол наклона отклонителя, градусы
                </label>
              </div>
              <input id="angleFact" className="calc-input"/>
              
              <div className="calc-label-div">
                <label htmlFor="pointOfMeasureFact"className="calc-label">
                  Введите предсказываемую пространственную интенсивность, градусы/метры в квадрате
                </label>
              </div>
              <input id="pointOfMeasureFact" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasurePredicted">
                  Введите предсказываемую точку замера, метры
                </label>
              </div>
              <input id="pointOfMeasurePredicted" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="intensityPredicted">
                  Введите фактичекую вертикаль, метры
                </label>
              </div>
              <input id="intensityPredicted" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="angleNormalized">
                  Введите фактическую точку замера, метры
                </label>
              </div>
              <input id="angleNormalized" className="calc-input"/>

              <div className="calc-label-div">
                <label htmlFor="tolerance">
                  Введите фактический угол наклона отклонителя, градусы 
                </label>
              </div>
              <input id="tolerance" className="calc-input"/>
              <div className="calc-submit-button-div">
                <button type="submit" className="calc-submit-button">
                  Рассчитать вертикаль
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

  




export default CalcVertical; 