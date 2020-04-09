export const objToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const uniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
