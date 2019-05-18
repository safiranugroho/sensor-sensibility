import getSensorGroups from './getSensorGroups';

const csv = 'data/sensor_group_location.csv';
const sensorGroups = getSensorGroups(csv);

export const getSensorGroupName = entry => {
  const { name } = sensorGroups.find(sensorGroup =>
    RegExp(`(${sensorGroup.uuidStartsWith})`).test(entry.sensor_uuid)
  );

  return name;
};

export default data => {
  const result = [];

  data.map(entry => {
    const key = getSensorGroupName(entry);
    if (!result[key]) result[key] = [];

    result[key].push(entry);
  });

  return result;
};