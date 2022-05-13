import React from 'react';
import { Highscore } from './Highscore';
import { Username } from './username';
import 'App.css';

export function Sidebar() {
  return (
    <div className="sidebar">
      <Highscore />
    </div>
  );
}
