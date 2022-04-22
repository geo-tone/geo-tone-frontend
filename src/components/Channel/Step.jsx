import { setPitchColor } from '../../utils/toneUtils';
import classNames from 'classnames';
import styles from './Channel.css';

export default function Step({ note, index }) {
  return (
    <div
      id={`step-${index}`}
      className={classNames(styles.step, setPitchColor(note))}
      onClick={(e) => handleNoteChange(e)}
    >
      {note}
    </div>
  );
}
