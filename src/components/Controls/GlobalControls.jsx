import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { motion } from 'framer-motion';
import styles from './GlobalControls.css';

export default function GlobalControls({ start, setStart }) {
  const {
    project: { project },
    handleProjectVolume,
    handleSongBPM,
  } = useProject();

  return (
    <div id="global-controls">
      <motion.button
        className={styles.playButton}
        whileHover={{ scale: 1.1 }}
        onClick={() => setStart(!start)}
      >
        {start ? 'stop' : 'play'}
      </motion.button>
      <label>
        Project Volume
        <input
          type="range"
          min="-48"
          max="0"
          value={project.volume}
          onChange={(e) => handleProjectVolume(e)}
        />
      </label>

      <label>
        BPM
        <input
          type="number"
          min="0"
          max="440"
          step="10"
          value={project.bpm}
          onChange={handleSongBPM}
        />
      </label>
    </div>
  );
}
