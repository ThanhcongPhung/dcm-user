export const getUrlParams = (search) => {
  const searchs = search.slice(search.indexOf(`?`) + 1).split(`&`);
  return searchs.reduce((acc, cur) => {
    const [key, val] = cur.split(`=`);
    return { ...acc, [key]: val };
  }, {});
};
