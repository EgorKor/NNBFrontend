import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import "./Calc.css"
import axios from "axios";

function CalcVertical(){
    const navigate = useNavigate();
    const [result, setResult] = useState("нет результата");
    const [anglePredicted,setAnglePredicted] = useState("0"); 
    const [intensityPredicted,setIntensityPredicted] = useState("0");
    const [pointOfMeasurePredicted,setPointOfMeasurePredicted] = useState("0");
    const [verticalFact,setVerticalFact] = useState("0");
    const [pointOfMeasureFact,setPointOfMeasureFact] = useState("0");
    const [angleFact,setAngleFact] = useState("0");

    const [anglePredictedError,setAnglePredictedError] = useState(""); 
    const [intensityPredictedError,setIntensityPredictedError] = useState("");
    const [pointOfMeasurePredictedError,setPointOfMeasurePredictedError] = useState("");
    const [verticalFactError,setVerticalFactError] = useState("");
    const [pointOfMeasureFactError,setPointOfMeasureFactError] = useState("");
    const [angleFactError,setAngleFactError] = useState("");
    const errorMessage = "Неправильный формат числа"

    const props = [
      {
        "props":anglePredicted,
        "setError":setAnglePredictedError
      },
      {
        "props":intensityPredicted,
        "setError":setIntensityPredictedError
      },
      {
        "props":pointOfMeasurePredicted,
        "setError":setPointOfMeasurePredictedError
      },
      {
        "props":verticalFact,
        "setError":setVerticalFactError
      },
      {
        "props":pointOfMeasureFact,
        "setError":setPointOfMeasureFactError
      },
      {
        "props":angleFact,
        "setError":setAngleFactError
      }
    ]
    
    const backFunc = () => {
        navigate("/dashboard");    
    }

    const isValidNumber = (input) => {
      const regex = /^[0-9]*\.?[0-9]*$/;
      return regex.test(input);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      let HasError = false;
      props.forEach(element => {
        element.setError("");
        if(!isValidNumber(element.props)){
          HasError = true;
          element.setError(errorMessage)
        }
      });
      if(HasError)
        return;
      try{
        let response = await axios.post("http://localhost:8080/api/v1/calcService/pointOfMeasure/predictVertical",
          {"anglePredicted":anglePredicted,
            "intensityPredicted":intensityPredicted,
            "pointOfMeasurePredicted":pointOfMeasurePredicted,
            "verticalFact":verticalFact,
            "pointOfMeasureFact":pointOfMeasureFact,
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
            <form className="calc-form left-allign" onSubmit={handleSubmit}>
              <div className="calc-label-div">
                <label htmlFor="anglePredicted" className="calc-label">
                  Введите предсказываемый угол наклона отклонителя, градусы
                </label>
              </div>
              {anglePredictedError && <p className="calc-label-error">{anglePredictedError}</p>}
              <input 
              id="anglePredicted" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setAnglePredicted(value);
              }}
              value={anglePredicted}
              />
              
              <div className="calc-label-div">
                <label htmlFor="intensityPredicted"className="calc-label">
                  Введите предсказываемую пространственную интенсивность, градусы/метры в квадрате
                </label>
              </div>
              {intensityPredictedError && <p className="calc-label-error">{intensityPredictedError}</p>}
              <input id="intensityPredicted" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setIntensityPredicted(value);
              }}
              value={intensityPredicted}
              />

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasurePredicted">
                  Введите предсказываемую точку замера, метры
                </label>
              </div>
              {pointOfMeasurePredictedError && <p className="calc-label-error">{pointOfMeasurePredictedError}</p>}
              <input id="pointOfMeasurePredicted" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setPointOfMeasurePredicted(value);
              }}
              value={pointOfMeasurePredicted}
              />

              <div className="calc-label-div">
                <label htmlFor="verticalFact">
                  Введите фактичекую вертикаль, метры
                </label>
              </div>
              {verticalFactError && <p className="calc-label-error">{verticalFactError}</p>}
              <input id="verticalFact" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setVerticalFact(value);
              }}
              value={verticalFact}
              />

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasureFact">
                  Введите фактическую точку замера, метры
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
              value={pointOfMeasureFact}
              />

              <div className="calc-label-div">
                <label htmlFor="angleFact">
                  Введите фактический угол наклона отклонителя, градусы 
                </label>
              </div>
              {angleFactError && <p className="calc-label-error">{angleFactError}</p>}
              <input id="angleFact" 
              className="calc-input"
              onChange={(e) => {
                let value = e.target.value; 
                value = value.replace(/[^0-9.]/g, '');
                setAngleFact(value);
              }}
              value={angleFact}/>
              <div className="calc-submit-button-div">
                <button type="submit" 
                className="calc-submit-button">
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