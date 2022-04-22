import { setPitchColor } from '../../utils/toneUtils';
import { useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import styles from './Channel.css';

const variants = {
  circle: {
    scale: 1.0,
    clipPath: 'circle(40%)',
  },
  triangle: {
    scale: 0.8,
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  },
  square: {
    scale: 1.0,
    clipPath: 'polygon(12% 12%,88% 12%,88% 88%,12% 88%)',
  },
  rhombus: {
    scale: 1.0,
    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  },
  pentagon: {
    scale: 0.8,
    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
  },
  hexagon: {
    scale: 0.9,
    clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
  },
};

const shapesArray = Object.keys(variants);

console.log('shapesArray', shapesArray);

export default function Step({ note, index, handleNoteChange }) {
  const [currentShape, setCurrentShape] = useState('circle');

  const nextShape = () => {
    const next = shapesArray.indexOf(currentShape) + 1;
    if (next < shapesArray.length) setCurrentShape(shapesArray[next]);
    else setCurrentShape(shapesArray[0]);
  };

  return (
    <motion.button
      id={`step-${index}`}
      className={classNames(styles.step, setPitchColor(note))}
      onClick={(e) => {
        nextShape();
        handleNoteChange(e);
      }}
      animate={currentShape}
      variants={variants}
    >
      {note}
    </motion.button>
  );
}
