
export const fetchLocally = (name = "crud-app") => {
  const localCaptains = localStorage.getItem(name);

  if (localCaptains !== "null") {
    return JSON.parse(localCaptains);
  }
  return null;
};

export const saveLocally = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
