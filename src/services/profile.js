// find profile info (avatar & bio) by userid
const findProfileByUserId = async (userId) => {
  try {
    const resp = await fetch(
      `${process.env.API_URL}/api/v1/profiles/${userId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const parsedData = await resp.json();

    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};
// edit profile by userid
// delete account
