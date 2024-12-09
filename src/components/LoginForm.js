import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import Cookies from 'js-cookie';

const LoginForm = () => {
    const [hash, setHash] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fetchLogin = async (hash) =>
    {
      try {
        const acceptedData = await axios.post('http://localhost:8080/api/v1/calcService/auth/getAccess', {
          "hash": hash
        });
        console.log('Успешный вход');
        console.log(`Получен токен - ${acceptedData.data.token}`);
        localStorage.setItem("token",acceptedData.data.token);
        navigate("/dashboard")
      } catch (error) {
        console.error('Ошибка:', error);
        setError("Ошибка доступа, ввёден неправильный хэш");
      }
    }
    
    const handleSubmit = (e) => {
      e.preventDefault(); 
      if (hash.length != 32) {
        setError("Длина хэша должна быть 32 символа");
        return;
      }
      setError("");
      console.log("Данные для входа:", { hash });      
      fetchLogin(hash);
    };
  
    console.log(`hash for login ${"b23cf2d0fb74b0ffa0cf4c70e6e04926"}`)

    return (
      <div className="main-container">
        <h1>Вход</h1>
        {error && <p className="hash-error">{error}</p>}  
        <form onSubmit={handleSubmit}>
          <div className="auth-form-div">
            <label htmlFor="hash" className="input-label">md5 hash:</label>
            <input
              type="password"
              id="hash"
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              className="auth-form-input"
            />
          </div>
          <button
            type="submit"
            className="auth-form-submit-button"
          >
            Войти
          </button>
        </form>
      </div>
    );
  };
  
  export default LoginForm;