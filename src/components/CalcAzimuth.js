import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import "./Calc.css"
import axios from "axios";

function CalcAzimuth(){
    const navigate = useNavigate();
    const [result, setResult] = useState("нет результата");
    const [instensityPredicted,setInstensityPredicted] = useState("0");
    const [pointOfMeasurePredicted,setPointOfMeasurePredicted] = useState("0");
    const [tfFact,setTfFact] = useState("0");
    const [anglePredicted,setAnglePredicted] = useState("0");
    const [pointOfMeasureFact,setPointOfMeasureFact] = useState("0");
    const [azimuthFact,setAzimuthFact] = useState("0");
    const [angleFact,setAngleFact] = useState("0");

    const [instensityPredictedError,setInstensityPredictedError] = useState("");
    const [pointOfMeasurePredictedError,setPointOfMeasurePredictedError] = useState("");
    const [tfFactError,setTfFactError] = useState("");
    const [anglePredictedError,setAnglePredictedError] = useState("");
    const [pointOfMeasureFactError,setPointOfMeasureFactError] = useState("");
    const [azimuthFactError,setAzimuthFactError] = useState("");
    const [angleFactError,setAngleFactError] = useState("");

    const errorMessage = "Неправильный формат числа"

    const states = [
      {
        "state":instensityPredicted,
        "setError":setInstensityPredictedError
      },
      {
        "state":pointOfMeasurePredicted,
        "setError":setPointOfMeasurePredictedError
      },
      {
        "state":tfFact,
        "setError":setTfFactError
      },
      {
        "state":anglePredicted,
        "setError":setAnglePredictedError
      },
      {
        "state":pointOfMeasureFact,
        "setError":setPointOfMeasureFactError
      },
      {
        "state":azimuthFact,
        "setError":setAzimuthFactError
      },
      {
        "state":angleFact,
        "setError":setAngleFactError
      }
    ]

    const isValidNumber = (input) => {
      const regex = /^[0-9]*\.?[0-9]*$/; // Регулярное выражение
      return regex.test(input);
    }

    const handleInput = (e, setFunc) => {
      let value = e.target.value; 
      value = value.replace(/[^0-9.]/g, '');
      setFunc(value);
    }


    const backFunc = () => {
        navigate("/dashboard");    
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      let HasError = false;
      states.forEach(element => {
        console.log(element);
        element.setError("");
        if(!isValidNumber(element.state)){
          HasError = true;
          element.setError(errorMessage)
        }
      });
      if(HasError)
        return;
      try{
        let response = await axios.post("http://localhost:8080/api/v1/calcService/pointOfMeasure/predictAzimuth",
          {
            "intensityPredicted":instensityPredicted,
            "pointOfMeasurePredicted":pointOfMeasurePredicted,
            "tfPredicted":tfFact,
            "anglePredicted":anglePredicted,
            "pointOfMeasureFact":pointOfMeasureFact,
            "azimuthFact":azimuthFact,
            "angleFact":angleFact
          }
        );
        setResult(response.data.result);
      }catch(e){
        setResult("Ошибка!");
      }
    };


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
            <form className="calc-form left-allign" onSubmit={handleSubmit}>
              <div className="calc-label-div">
                <label htmlFor="instensityPredicted" className="calc-label">
                  Введите предсказываемую пространстенную интенсивность, гр/м2
                </label>
              </div>
              {instensityPredictedError && <p className="calc-label-error">{instensityPredictedError}</p>}
              <input 
                id="instensityPredicted" 
                className="calc-input"
                value={instensityPredicted}
                onChange={(e) => handleInput(e, setInstensityPredicted)}
              />
              
              <div className="calc-label-div">
                <label htmlFor="pointOfMeasurePredicted"className="calc-label">
                  Введите предсказываемую точку замера, м
                </label>
              </div>
              {pointOfMeasurePredictedError && <p className="calc-label-error">{pointOfMeasurePredictedError}</p>}
              <input 
                id="pointOfMeasurePredicted" 
                className="calc-input"
                value={pointOfMeasurePredicted}
                onChange={(e) => handleInput(e, setPointOfMeasurePredicted)}
              />

              <div className="calc-label-div">
                <label htmlFor="tfFact">
                  Введите фактическое направление искревления скважины, градусы
                </label>
              </div>
              {tfFactError && <p className="calc-label-error">{tfFactError}</p>}
              <input 
                id="tfFact" 
                className="calc-input"
                value={tfFact}
                onChange={(e) => handleInput(e, setTfFact)}
              />

              <div className="calc-label-div">
                <label htmlFor="anglePredicted">
                  Введите предсказываемый угол наклона, град
                </label>
              </div>
              {anglePredictedError && <p className="calc-label-error">{anglePredictedError}</p>}
              <input 
                id="anglePredicted" 
                className="calc-input"
                value={anglePredicted}
                onChange={(e) => handleInput(e, setAnglePredicted)}
              />

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasureFact">Введите фактичекую точку замера, м</label>
              </div>
              {pointOfMeasureFactError && <p className="calc-label-error">{pointOfMeasureFactError}</p>}
              <input 
                id="pointOfMeasureFact" 
                className="calc-input"
                value={pointOfMeasureFact}
                onChange={(e) => handleInput(e, setPointOfMeasureFact)}
              />

              <div className="calc-label-div">
                <label htmlFor="azimuthFact">Введите фактический азимут, гр</label>
              </div>
              {azimuthFactError && <p className="calc-label-error">{azimuthFactError}</p>}
              <input 
                id="azimuthFact" 
                className="calc-input"
                value={azimuthFact}
                onChange={(e) => handleInput(e, setAzimuthFact)}
              />
            
              <div className="calc-label-div">
                <label htmlFor="angleFact">Введите угол наклона фактический, гр</label>
              </div>
              {angleFactError && <p className="calc-label-error">{angleFactError}</p>}
              <input 
              id="angleFact" 
              className="calc-input"
              value={angleFact}
              onChange={(e) => handleInput(e, setAngleFact)}
              />

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