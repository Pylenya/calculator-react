import "./index.css";
import "./style.css";
import React from "react";
import { useEffect, useState } from "react";
function App() {
  const buttons = [
    { value: "7", specification: "default" },
    { value: "8", specification: "default" },
    { value: "9", specification: "default" },
    { value: "DEL", specification: "special" },
    { value: "4", specification: "default" },
    { value: "5", specification: "default" },
    { value: "6", specification: "default" },
    { value: "+", specification: "operator" },
    { value: "1", specification: "default" },
    { value: "2", specification: "default" },
    { value: "3", specification: "default" },
    { value: "-", specification: "operator" },
    { value: ".", specification: "operator" },
    { value: "0", specification: "default" },
    { value: "/", specification: "operator" },
    { value: "*", specification: "operator" },
    { value: "RESET", specification: "special-big" },
    { value: "=", specification: "enter-big" },
  ];

  const [theme, setTheme] = useState("light");
  const [value, setValue] = useState("0");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const resetClick = () => {
    setValue("0");
  };

  const numberClick = (digit) => {
    if (value.length >= 12) alert("Слишком большое число");
    if (value.length < 12) {
      if (value === "0") {
        setValue(digit);
      } else {
        setValue(value + digit);
      }
    }
  };
  const operatorClick = (operator) => {
    if (value.length >= 13) alert("Слишком большое число");

    if (value.length < 13 && value[value.length - 1] !== operator) {
      setValue(value + operator);
    }
  };
  const equalsClick = () => {
    try {
      if (
        value[value.length - 1] !== "*" ||
        value[value.length - 1] !== "-" ||
        value[value.length - 1] !== "+" ||
        value[value.length - 1] !== "/" ||
        value[value.length - 1] !== "."
      ) {
        console.log(value[value.length - 1]);
        setValue(eval(value).toString());
      }
    } catch (e) {
      alert("Неправильный формат числа");
      setValue("0");
    }
  };
  const delClick = () => {
    console.log(value.length);
    if (value.length === 1) {
      setValue("0");
    } else {
      setValue(value.slice(0, -1));
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="calc">
          <div className="calc__top">
            <div className="calc__title">
              <h1>calc</h1>
            </div>
            <div className="calc__theme">
              <span className="calc__theme-title">theme</span>
              <label className="switch">
                <input onChange={toggleTheme} type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="calc__display">
            <p>{value}</p>
          </div>
          <div className="calc__pad">
            {buttons.map((button) => {
              if (button.specification === "default") {
                return (
                  <button
                    onClick={(e) => numberClick(e.target.value)}
                    key={button.value}
                    value={button.value}
                    className="btn btn-default"
                  >
                    {button.value}
                  </button>
                );
              } else if (button.specification === "special") {
                return (
                  <button
                    onClick={() => delClick()}
                    key={button.value}
                    value={button.value}
                    className="btn btn-special"
                  >
                    {button.value}
                  </button>
                );
              } else if (button.specification === "operator") {
                return (
                  <button
                    onClick={(e) => {
                      operatorClick(e.target.value);
                    }}
                    key={button.value}
                    value={button.value}
                    className="btn btn-default"
                  >
                    {button.value}
                  </button>
                );
              } else if (button.specification === "enter-big") {
                return (
                  <button
                    onClick={() => equalsClick()}
                    key={button.value}
                    value={button.value}
                    className={`btn btn-${button.specification}`}
                  >
                    {button.value}
                  </button>
                );
              } else if (button.specification === "special-big") {
                return (
                  <button
                    onClick={() => resetClick()}
                    key={button.value}
                    value={button.value}
                    className={`btn btn-${button.specification}`}
                  >
                    {button.value}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
// ДВА СОСТОЯНИЕ ДЛЯ ЦИФР ДО И ПОСЛЕ ЗНАКА СОСТОЯНИЕ НА ЗНАК ЛИБО ВСЁ В ОДНУ СТРОЧКУ ЧЕРЕЗ ЕВАЛ
//
