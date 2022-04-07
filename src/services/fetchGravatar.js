const fetchGravatar = async (email) => {
  const response = await fetch(`https://www.gravatar.com/avatar/${email}?d=wavatar`);
  return response;
};

export default fetchGravatar;
