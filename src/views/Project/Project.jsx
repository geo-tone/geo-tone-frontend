import { useState } from 'react';
import { Song as Sequencer } from 'reactronica';
import { useProject } from '../../context/ProjectContext';
import { handleSaveProject } from '../../services/project';
import GlobalControls from '../../components/Controls/GlobalControls';
import Channel from '../../components/Channel/Channel';
import Dropdown from '../../components/Channel/Dropdown';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './Project.css';
import editTitle from '../../assets/editTitle.png';
import saveTitle from '../../assets/save.png';
import { motion } from 'framer-motion';

export default function Project({ isLoggedIn = false }) {
  // BACKEND CONNECTION
  // if isLoggedIn
  // GET PROJECT BY PROJECT ID
  // user_id from project and GET user by user_id

  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [start, setStart] = useState(false);
  const {
    projectId,
    project: { isLoading, addingChannel, setAddingChannel, project },
    handleAddChannel,
    handleTitleChange,
  } = useProject();

  const handleSaveProjectAndRedirect = () => {
    handleSaveProject({ projectId, project });
    navigate(`/user/${currentUser.username}`, { push: true });
  };

  if (isLoading) return <div> loading ... </div>;
  return (
    <div className={styles.currentProject}>
      <div className={styles.fixedProject}>
        {isEditing ? (
          <div className={styles.projectTitle}>
            <input
              type="text"
              value={project.title}
              onChange={handleTitleChange}
            />
            <button onClick={() => setIsEditing(false)}>
              <img src={saveTitle} alt="Save Title" />
            </button>
          </div>
        ) : (
          <div className={styles.projectTitle}>
            <h1>{project.title}</h1>
            {currentUser.userId === project.userId && (
              <button onClick={() => setIsEditing(true)}>
                <img src={editTitle} alt="Edit Title" />
              </button>
            )}
          </div>
        )}
        {currentUser.userId === project.userId && (
          <button
            className={styles.saveProject}
            onClick={handleSaveProjectAndRedirect}
          >
            Save Project
          </button>
        )}
        <div className={styles.sequencerContainer}>
          <Sequencer
            isPlaying={start}
            bpm={project.bpm}
            volume={project.volume}
          >
            <GlobalControls start={start} setStart={setStart} />
            {project.channels.map((channel) => (
              <Channel key={`channel-${channel.id}`} channel={channel} />
            ))}
          </Sequencer>

          {addingChannel ? (
            <Dropdown {...{ handleAddChannel }} />
          ) : (
            <button onClick={() => setAddingChannel(true)}>+</button>
          )}
        </div>
      </div>
      {/* <motion.div
        className={styles.square}
        whileHover={{ scale: 1.1 }}
        drag="y"
        dragConstraints={{ left: -100, right: 100 }}
      />
      <motion.div
        className={styles.circle}
        whileHover={{ scale: 1.1 }}
        drag="y"
        dragConstraints={{ left: -100, right: 100 }}
      />
      <motion.div
        className={styles.triangle}
        whileHover={{ scale: 1.1 }}
        drag="y"
        dragConstraints={{ left: -100, right: 100 }}
      /> */}
    </div>
  );
}
