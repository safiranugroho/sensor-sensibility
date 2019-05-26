
export default (entry) => {
  const data = entry.replace(/['"]+/g, '').split(',');

  return {
    name: data[0],
    latitude: data[2],
    longitude: data[3]
  };
};