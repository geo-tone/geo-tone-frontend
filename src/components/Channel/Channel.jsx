import { useState, useEffect } from 'react';
import { Track, Instrument, Effect } from 'reactronica';
import { useProject } from '../../context/ProjectContext';
import {
  keyCMajorPentatonic2,
  keyCMajorPentatonic3,
  keyCMajorPentatonic4,
  setPitchColor,
} from '../../utils/toneUtils';

import classNames from 'classnames';
import styles from './Channel.css';
import Row from './Row';
import Dropdown from './Dropdown';
import Controls from './Controls';
import { BitCrusher } from 'tone';

export default function Channel({ channel }) {
  const [instrument, setInstrument] = useState(channel.type);
  const [oscillator, setOscillator] = useState(channel.osc);
  const [volume, setVolume] = useState(channel.volume);
  const [keyArray, setKeyArray] = useState(keyCMajorPentatonic4);
  const [notes, setNotes] = useState(channel.steps);
  const [fx, setFx] = useState({
    reverb: channel.reverb,
  });

  const [fx1, setFx1] = useState(0);
  const [fx2, setFx2] = useState(0);
  const [attack, setAttack] = useState(0.1);
  const [release, setRelease] = useState(0.1);

  const { handleUpdateChannel } = useProject();

  const channelId = channel.id;

  useEffect(() => {
    const channelObj = {
      id: channelId,
      type: instrument,
      osc: oscillator,
      steps: notes,
      volume: volume,
      reverb: fx.reverb,
    };
    handleUpdateChannel(channelObj);
  }, [instrument, oscillator, volume, notes, fx]);

  const highlightCurrentStep = (stepIndex) => {
    const sequence = document
      .getElementById(`channel-${channelId}`)
      .querySelectorAll(`.${styles.step}`);

    sequence.forEach((stepDiv, stepDivIndex) => {
      if (stepIndex === stepDivIndex) {
        stepDiv.className = classNames(
          styles.active,
          styles.step,
          setPitchColor(stepDiv.textContent)
        );
      } else {
        stepDiv.className = classNames(
          styles.step,
          setPitchColor(stepDiv.textContent)
        );
      }
    });
  };

  //changes the note up the given key
  const handleNoteChange = (e) => {
    const indexOfStep = e.target.id.split('-')[1];

    const indexOfKeyArray = keyArray.findIndex(
      (note) => note === e.target.textContent
    );

    const newNotes = notes.map((note, index) => {
      if (Number(indexOfStep) === index) {
        return keyArray[indexOfKeyArray + 1];
      }
      return note;
    });

    setNotes(newNotes);
  };

  return (
    <div id={`channel-${channelId}`} className={styles.channel}>
      <Track
        steps={notes}
        volume={volume}
        onStepPlay={(step, stepIndex) => highlightCurrentStep(stepIndex)}
      >
        <Instrument
          type={instrument}
          envelope={{ attack, release }}
          oscillator={{ type: oscillator }}
        />
        <Effect type="bitCrusher" wet={fx1} />
        <Effect type="feedbackDelay" wet={fx2} />
        <Effect type="freeverb" wet={fx.reverb} />
      </Track>
      {/* Display components below*/}
      <Row {...{ notes, handleNoteChange }} />
      <Dropdown {...{ instrument, setInstrument, oscillator, setOscillator }} />
      <Controls {...{ channelId, volume, setVolume, fx, setFx }} />
      <div>
        <label>
          fx1
          <input
            type="range"
            min="0.0"
            max="1"
            step="0.05"
            onChange={(e) => setFx1(e.target.value)}
            value={fx1}
          />
        </label>
        <label>
          fx2
          <input
            type="range"
            min="0.0"
            max="1"
            step="0.05"
            onChange={(e) => setFx2(e.target.value)}
            value={fx2}
          />
        </label>
      </div>
    </div>
  );
}
