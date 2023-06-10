import React, { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setOperator(null);
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{displayValue}</div>
      <div className={styles.keypad}>
        <button
          onClick={clearDisplay}
          className={`${styles.button} ${styles.buttonClear}`}
        >
          AC
        </button>
        <button onClick={() => inputDigit("7")} className={styles.button}>
          7
        </button>
        <button onClick={() => inputDigit("8")} className={styles.button}>
          8
        </button>
        <button onClick={() => inputDigit("9")} className={styles.button}>
          9
        </button>
        <button
          onClick={() => performOperation("/")}
          className={`${styles.button} ${styles.buttonOperator}`}
        >
          /
        </button>
        <button onClick={() => inputDigit("4")} className={styles.button}>
          4
        </button>
        <button onClick={() => inputDigit("5")} className={styles.button}>
          5
        </button>
        <button onClick={() => inputDigit("6")} className={styles.button}>
          6
        </button>
        <button
          onClick={() => performOperation("*")}
          className={`${styles.button} ${styles.buttonOperator}`}
        >
          *
        </button>
        <button onClick={() => inputDigit("1")} className={styles.button}>
          1
        </button>
        <button onClick={() => inputDigit("2")} className={styles.button}>
          2
        </button>
        <button onClick={() => inputDigit("3")} className={styles.button}>
          3
        </button>
        <button
          onClick={() => performOperation("-")}
          className={`${styles.button} ${styles.buttonOperator}`}
        >
          -
        </button>
        <button onClick={() => inputDigit("0")} className={styles.buttonZero}>
          0
        </button>
        <button onClick={inputDecimal} className={styles.button}>
          .
        </button>
        <button
          onClick={() => performOperation("+")}
          className={`${styles.button} ${styles.buttonOperator}`}
        >
          +
        </button>
        <button
          onClick={() => performOperation("=")}
          className={`${styles.button} ${styles.buttonEquals}`}
        >
          =
        </button>
      </div>
      <div class={styles.ok}>AGAM</div>
    </div>
  );
};

export default Calculator;
