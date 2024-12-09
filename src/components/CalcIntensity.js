import React, { useState } from "react";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";
import "./Calc.css"
import axios from "axios";

function CalcIntensity(){
    const navigate = useNavigate();
    const [result, setResult] = useState("нет результата");
    const [DLcp,setDLcp] = useState("0");
    const [slideLengthPrev,setSlideLengthPrev] = useState("0");
    const [slideLengthThis,setSlideLengthThis] = useState("0");
    const [pointOfMeasureFact1,setPointOfMeasureFact1] = useState("0");
    const [pointOfMeasureFact2,setPointOfMeasureFact2] = useState("0");
    const [pointOfMeasurePredicted,setPointOfMeasurePredicted] = useState("0");
    const [intensityFact,setIntensityFact] = useState("0");

    const [DLcpError,setDLcpError] = useState("");
    const [slideLengthPrevError,setSlideLengthPrevError] = useState("");
    const [slideLengthThisError,setSlideLengthThisError] = useState("");
    const [pointOfMeasureFact1Error,setPointOfMeasureFact1Error] = useState("");
    const [pointOfMeasureFact2Error,setPointOfMeasureFact2Error] = useState("");
    const [pointOfMeasurePredictedError,setPointOfMeasurePredictedError] = useState("");
    const [intensityFactError,setIntensityFactError] = useState("");

    const states = 
    [
      {"state":DLcp,
        "setError":setDLcpError
      },
      {"state":slideLengthPrev,
        "setError":setSlideLengthPrevError
      },
      {"state":slideLengthThis,
        "setError":setSlideLengthThisError
      },
      {"state":pointOfMeasureFact1,
        "setError":setPointOfMeasureFact1Error
      },
      {"state":pointOfMeasureFact2,
        "setError":setPointOfMeasureFact2Error
      },
      {"state":pointOfMeasurePredicted,
        "setError":setPointOfMeasurePredictedError
      },
      {"state":intensityFact,
        "setError":setIntensityFactError
      }
    ]

    const errorMessage = "Неправильный формат числа"

    const backFunc = () => {
        navigate("/dashboard");    
    }

    const isValidNumber = (input) => {
      const regex = /^[0-9]*\.?[0-9]*$/; // Регулярное выражение
      return regex.test(input);
    }

    const handleInput = (e, setFunc) => {
      let value = e.target.value; 
      value = value.replace(/[^0-9.]/g, '');
      setFunc(value);
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
        let response = await axios.post("http://localhost:8080/api/v1/calcService/pointOfMeasure/predictIntensity",
          {
            "DLcp":DLcp,
            "slideLengthPrevSingle":slideLengthPrev,
            "slideLengthThisSingle":slideLengthThis,
            "pointOfMeasureFact1":pointOfMeasureFact1,
            "pointOfMeasureFact2":pointOfMeasureFact2,
            "pointOfMeasurePredicted":pointOfMeasurePredicted,
            "intensityFact":intensityFact
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
                Расчёт пространственной интенсивности
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
                <label htmlFor="DLcp" className="calc-label">
                  Введите параметр DL cp, единицы
                </label>
              </div>
              {DLcpError && <p className="calc-label-error">{DLcpError}</p>}
              <input id="DLcp" 
              className="calc-input"
              value={DLcp}
              onChange={(e) => {handleInput(e, setDLcp)}}
              />
              
              <div className="calc-label-div">
                <label htmlFor="slideLengthPrev" className="calc-label">
                  Введите размер слайда зашедшего на прошлой одиночке, метры
                </label>
              </div>
              {slideLengthPrevError && <p className="calc-label-error">{slideLengthPrevError}</p>}
              <input id="slideLengthPrev" 
              className="calc-input"
              value={slideLengthPrev}
              onChange={(e) => {handleInput(e, setSlideLengthPrev)}}
              />

              <div className="calc-label-div">
                <label htmlFor="slideLengthThis">
                  Введите размер слайда зашедшего на текущей одиночке, метры
                </label>
              </div>
              {slideLengthThisError && <p className="calc-label-error">{slideLengthThisError}</p>}
              <input id="slideLengthThis" 
              className="calc-input"
              value={slideLengthThis}
              onChange={(e) => {handleInput(e, setSlideLengthThis)}}
              />

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasureFact1">
                  Введите фактическую точку замера номер 1, метры 
                  </label>
              </div>
              {pointOfMeasureFact1Error && <p className="calc-label-error">{pointOfMeasureFact1Error}</p>}
              <input id="pointOfMeasureFact1" 
              className="calc-input"
              value={pointOfMeasureFact1}
              onChange={(e) => {handleInput(e, setPointOfMeasureFact1)}}
              />

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasureFact2">
                  Введите фактичекую точку замера номер 2, метры
                </label>
              </div>
              {pointOfMeasureFact2Error && <p className="calc-label-error">{pointOfMeasureFact2Error}</p>}
              <input id="pointOfMeasureFact2" 
              className="calc-input"
              value={pointOfMeasureFact2}
              onChange={(e) => {handleInput(e, setPointOfMeasureFact2)}}
              />

              <div className="calc-label-div">
                <label htmlFor="pointOfMeasurePredicted">
                  Введите предсказываемую точку замера, метры
                  </label>
              </div>
              {pointOfMeasurePredictedError && <p className="calc-label-error">{pointOfMeasurePredictedError}</p>}
              <input id="pointOfMeasurePredicted" 
              className="calc-input"
              value={pointOfMeasurePredicted}
              onChange={(e) => {handleInput(e, setPointOfMeasurePredicted)}}
              />
              
              <div className="calc-label-div">
                <label htmlFor="intensityFact">
                  Введите фактичекую пространственную интенсивность, градусы/метры в квадрате
                </label>
              </div>
              <input id="intensityFact" 
              className="calc-input"
              value={intensityFact}
              onChange={(e) => {handleInput(e, setIntensityFact)}}
              />

              <div className="calc-submit-button-div">
                <button type="submit" className="calc-submit-button">
                  Рассчитать интенсивность
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

  




export default CalcIntensity; 