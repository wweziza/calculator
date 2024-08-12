'use client'
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const animateOwl = () => {
      const owl = document.querySelector(`.${styles.owl}`) as HTMLElement;
      if (owl) {
        owl.style.setProperty('--fly-x', `${Math.random() * 80 - 40}px`);
        owl.style.setProperty('--fly-y', `${Math.random() * 80 - 40}px`);
      }
    };

    const interval = setInterval(animateOwl, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (value: string) => {
    if (display === '0' && !isNaN(Number(value))) {
      setDisplay(value);
      setExpression(value);
    } else {
      setDisplay(display + value);
      setExpression(expression + value);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleEquals = () => {
    try {
      const result = eval(expression);
      const roundedResult = Number(result.toFixed(8)).toString();
      setDisplay(roundedResult);
      setExpression(roundedResult);
      setHistory([...history, `${expression} = ${roundedResult}`]);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleFunction = (func: string) => {
    setExpression(expression + func + '(');
    setDisplay(display + func + '(');
  };

  const handleSpecialFunction = (func: string) => {
    const result = eval(`Math.${func}(${expression})`);
    setDisplay(result.toString());
    setExpression(result.toString());
    setHistory([...history, `${func}(${expression}) = ${result}`]);
  };

  const buttons = [
    { id: 'clear', value: 'C', onClick: handleClear, class: styles.functionBtn },
    { id: 'parentheses', value: '( )', onClick: () => handleClick('()'), class: styles.functionBtn },
    { id: 'percent', value: '%', onClick: () => handleClick('%'), class: styles.functionBtn },
    { id: 'divide', value: '÷', onClick: () => handleClick('/'), class: styles.operatorBtn },
    { id: 'seven', value: '7', onClick: () => handleClick('7') },
    { id: 'eight', value: '8', onClick: () => handleClick('8') },
    { id: 'nine', value: '9', onClick: () => handleClick('9') },
    { id: 'multiply', value: '×', onClick: () => handleClick('*'), class: styles.operatorBtn },
    { id: 'four', value: '4', onClick: () => handleClick('4') },
    { id: 'five', value: '5', onClick: () => handleClick('5') },
    { id: 'six', value: '6', onClick: () => handleClick('6') },
    { id: 'subtract', value: '-', onClick: () => handleClick('-'), class: styles.operatorBtn },
    { id: 'one', value: '1', onClick: () => handleClick('1') },
    { id: 'two', value: '2', onClick: () => handleClick('2') },
    { id: 'three', value: '3', onClick: () => handleClick('3') },
    { id: 'add', value: '+', onClick: () => handleClick('+'), class: styles.operatorBtn },
    { id: 'zero', value: '0', onClick: () => handleClick('0') },
    { id: 'decimal', value: '.', onClick: () => handleClick('.') },
    { id: 'equals', value: '=', onClick: handleEquals, class: styles.equalsBtn },
    { id: 'sin', value: 'sin', onClick: () => handleFunction('Math.sin'), class: styles.functionBtn },
    { id: 'cos', value: 'cos', onClick: () => handleFunction('Math.cos'), class: styles.functionBtn },
    { id: 'tan', value: 'tan', onClick: () => handleFunction('Math.tan'), class: styles.functionBtn },
    { id: 'log', value: 'log', onClick: () => handleFunction('Math.log'), class: styles.functionBtn },
    { id: 'pow', value: 'x^y', onClick: () => handleClick('**'), class: styles.functionBtn },
    { id: 'sqrt', value: '√', onClick: () => handleFunction('Math.sqrt'), class: styles.functionBtn },
    { id: 'factorial', value: 'x!', onClick: () => handleSpecialFunction('factorial'), class: styles.functionBtn },
    { id: 'abs', value: '|x|', onClick: () => handleSpecialFunction('abs'), class: styles.functionBtn },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.displayWrapper}>
          <div id="display" className={styles.display}>
            {display}
          </div>
          <div className={styles.expression}>{expression}</div>
        </div>
        <div className={styles.buttons}>
          {buttons.map((button) => (
            <button
              key={button.id}
              id={button.id}
              className={`${styles.button} ${button.class || ''}`}
              onClick={button.onClick}
            >
              {button.value}
            </button>
          ))}
        </div>
        <div className={styles.history}>
          <h3>History</h3>
          <ul>
            {history.slice(-5).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.owlContainer}>
        <div className={styles.owl}>🦉</div>
      </div>
      <footer className={styles.footer}>
        Created by <a href="https://github.com/wweziza/calculator" target="_blank" rel="noopener noreferrer">weziza</a>
      </footer>
    </div>
  );
};

export default Calculator;