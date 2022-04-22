export const getAggregate = async () => {
  try {
    const resp = await fetch(
      `${process.env.API_URL}/api/v1/projects/aggregate`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        mode: 'cors',
      }
    );
    const parsedData = await resp.json();

    return parsedData;
  } catch (error) {
    throw new Error(error);
  }
};
