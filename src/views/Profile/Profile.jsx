import { useEffect } from 'react';
import {
  findProjectsByUserId,
  deleteProjectById,
} from '../../services/project';
import { findProfileByUserId } from '../../services/profile';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { username } = useParams();
  console.log('username', username);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await findProfileByUserId;
    };
  });

  // BACKEND CONNECTION

  // button that says create project
  // POST to projects
  // res from POST = { projectId }
  // redirect to="/project/${projectId}"

  // GET PROJECTS BY USER_ID
  // use username to get user_id
  // or put user_id in params

  return <div>{username}</div>;
}
