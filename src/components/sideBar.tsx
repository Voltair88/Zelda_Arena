import React from 'react';
import { Highscore } from './Highscore';
import { ContactInfo } from './contactInfo';

export function Sidebar() {
  return (
    <div className="sidebar">
      <p>control Link with arrow keys and space to shoot</p>
      <Highscore />
      <ContactInfo />
    </div>
  );
}
