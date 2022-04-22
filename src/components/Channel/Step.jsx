import { useState } from 'react';
import { setPitchColor } from '../../utils/toneUtils';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import styles from './Channel.css';

export default function Step({ note, index, handleNoteChange }) {
  const [toggle, setToggle] = useState(true);

  const variants = {
    square: { borderRadius: '5%' },
    circle: { borderRadius: '50%' },
  };
  return (
    <motion.div
      id={`track-${index}`}
      className={classNames(styles.step, setPitchColor(note))}
      onClick={(e) => {
        setToggle(!toggle);
        handleNoteChange(e);
      }}
      animate={toggle ? 'circle' : 'square'}
      variants={variants}
    >
      {note}
    </motion.div>
  );
}
