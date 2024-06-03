export const convertDateToID = (date) => {
  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  const createdAt = new Date(date).toLocaleDateString('id-ID', options);

  const splitCreatedAt = createdAt.split(' ');
  const hour = splitCreatedAt[1].split('.').join(':');

  return `${splitCreatedAt[0]} ${hour} ${
    splitCreatedAt[splitCreatedAt.length - 1]
  }`;
};
