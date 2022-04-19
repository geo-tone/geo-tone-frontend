const getUser = async () => {
  try {
    const resp = await fetch(`${process.env.API_URL}/api/v1/profiles/user/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    console.log('resp', resp);
    return await resp.json();
  } catch (error) {
    throw new Error(error);
  }
};

const registerUser = async (username, password) => {
  try {
    const user = { username, password };
    const resp = await fetch(`${process.env.API_URL}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      credentials: 'include',
      mode: 'cors',
    });
    return await resp.json();
  } catch (error) {
    throw new Error(error);
  }
};

const signInUser = async (username, password) => {
  try {
    const user = { username, password };
    const resp = await fetch(`${process.env.API_URL}/api/v1/users/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      credentials: 'include',
      mode: 'cors',
    });
    return await resp.json();
  } catch (error) {
    throw new Error(error);
  }
};

export { getUser, registerUser, signInUser };
