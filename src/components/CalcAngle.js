import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import "./Calc.css"
import { use } from "react";
import axios from "axios";

function CalcAngle(){
    const [result, setResult] = useState("нет результата");
    const [angleFact, setAngleFact] = useState("0");
    const [pointOfMeasureFact, setPointOfMeasureFact] = useState("0");
    const [pointOfMeasurePredicted,setPointOfMeasurePredicted] = useState("0");
    const [intensityPredicted, setIntensityPredicted] = useState("0");
    const [angleNormalized,setAngleNormalized] = useState("0");
    const [tolerance, setTolerance] = useState("0");    

    const [angleFactError, setAngleFactError] = useState("");
    const [pointOfMeasureFactError, setPointOfMeasureFactError] = useState("");
    const [pointOfMeasurePredictedError,setPointOfMeasurePredictedError] = useState("");
    const [intensityPredictedError, setIntensityPredictedError] = useState("");
    const [angleNormalizedError,setAngleNormalizedError] = useState("");
    const [toleranceError, setToleranceError] = useState("");  
    const errorMessage = "Неправильный формат числа"

    const props = [
      {
        "prop":angleFact, 
        "setProp":setAngleFact,
        "errorProp":angleFactError, 
        "setErrorProp":setAngleFactError
      },
      {
        "prop":pointOfMeasureFact, 
        "setProp":setPointOfMeasureFact,
        "errorProp":pointOfMeasureFactError, 
        "setErrorProp":setPointOfMeasureFactError
      },
      {
        "prop":pointOfMeasurePredicted,
        "setProp":setPointOfMeasurePredicted,
        "errorProp":pointOfMeasurePredictedError,
        "setErrorProp":setPointOfMeasurePredictedError
      },
      {
        "prop":intensityPredicted,
        "setProp":setIntensityPredicted,
        "errorProp":intensityPredictedError, 
        "setErrorProp":setIntensityPredictedError
      },
      {
        "prop":angleNormalized,
        "setProp":setAngleNormalized,
        "errorProp":angleNormalizedError,
        "setErrorProp":setAngleNormalizedError

      },
      {
        "prop":tolerance, 
        "setProp":setTolerance,
        "errorProp":toleranceError, 
        "setErrorProp":setToleranceError
      }
    ]


    const navigate = useNavigate();
    const backFunc = () => {
        navigate("/dashboard");    
    }

    const isValidNumber = (input) => {
      const regex = /^[0-9]*\.?[0-9]*$/; // Регулярное выражение
      return regex.test(input);
    }


    const handleSubmit = async (e) => {
      e.preventDefault();
      let HasError = false;
      props.forEach(element => {
        element.setErrorProp("");
        if(!isValidNumber(element.prop)){
          HasError = true;
          element.setErrorProp(errorMessage)
        }
      });
      if(HasError)
        return;
      try{
        let response = await axios.post("http://localhost:8080/api/v1/calcService/pointOfMeasure/predictAngle",
          {"factAngle":angleFact,
            "factPointOfMeasure":pointOfMeasureFact,
            "predictPointOfMeasure":pointOfMeasurePredicted,
            "predictIntensity":intensityPredicted,
            "targetValue":angleNormalized,
            "tolerance":tolerance
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
                Расчёт угла наклона отклонителя
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
                <label htmlFor="angleFact" className="calc-label">
                  Введите фактический угол, гр.
                </label>
              </div>
              {angleFactError && <p className="calc-label-error">{angleFactError}</p>}
              <input  
              id="angleFact" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setAngleFact(value);
              }}
              value={angleFact}/>
              
              <div className="calc-label-div">
                <label htmlFor="pointOfMeasureFact"
                className="calc-label">
                  Введите фактичекую точку замера, м
                </label>
              </div>
              {pointOfMeasureFactError && <p className="calc-label-error">{pointOfMeasureFactError}</p>}
              <input id="pointOfMeasureFact" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setPointOfMeasureFact(value);
              }}
              value={pointOfMeasureFact}/>

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasurePredicted">Введите предсказываемую точку замера, м</label>
              </div>
              {pointOfMeasurePredictedError && <p className="calc-label-error">{pointOfMeasurePredictedError}</p>}
              <input id="pointOfMeasurePredicted" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setPointOfMeasurePredicted(value);
              }}
              value={pointOfMeasurePredicted}/>

              <div className="calc-label-div">
                <label htmlFor="intensityPredicted">Введите предсказываемую пространственную интенсивность, гр/м2</label>
              </div>
              {intensityPredictedError && <p className="calc-label-error">{intensityPredictedError}</p>}
              <input id="intensityPredicted" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setIntensityPredicted(value);
              }}
              value={intensityPredicted}/>

              <div className="calc-label-div">
                <label htmlFor="angleNormalized">Введите нормализованный угол, гр</label>
              </div>
              {angleNormalizedError && <p className="calc-label-error">{angleNormalizedError}</p>}
              <input id="angleNormalized" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setAngleNormalized(value);
              }}
              value={angleNormalized}/>

              <div className="calc-label-div">
                <label htmlFor="tolerance">Введите погрешность, доли</label>
              </div>
              {toleranceError && <p className="calc-label-error">{toleranceError}</p>}
              <input id="tolerance" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setTolerance(value);
              }}
              value={tolerance}/>
              <div className="calc-submit-button-div">
                <button type="submit" className="calc-submit-button" >
                  Рассчитать угол
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

  




export default CalcAngle; 