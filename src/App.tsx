import React, { useState, useEffect } from 'react';
import './App.scss';
import { Clock } from './component/Clock/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

export const App: React.FC = () => {
  const [hasClock, setHasClock] = useState(true);
  const [clockName, setClockName] = useState('Clock-0');

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault(); // not to show the context menu
      setHasClock(false);
    };

    const handleClick = () => {
      setHasClock(true);
    };

    const timerId = window.setInterval(() => {
      const newName = getRandomName();

      // eslint-disable-next-line no-console
      //console.warn(`Renamed from ${clockName} to ${newName}`);
      setClockName(newName);
    }, 3300);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      window.clearInterval(timerId);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, [clockName]);

  return (
    <div className="App">
      <h1>React clock</h1>
      {hasClock && <Clock getRandomName={getRandomName} name={clockName} />}
    </div>
  );
};
