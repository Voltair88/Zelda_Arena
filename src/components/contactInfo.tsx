import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

export function ContactInfo() {
  return (
    <div className="contactInfo">
      <p> Bug: if your not seeing the highscore board try refreshing the page</p>
      <p> Bug: first time you die your score doesnt save</p>
      <a href="https://github.com/Voltair88" rel="noopener noreferrer" target="_blank" aria-label="Github">
        <GitHubIcon />
      </a>
    </div>
  );
}
