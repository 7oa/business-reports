const sortFunc = (key, order = "asc") => {
  if (!key) return 0;
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    let comparison = 0;
    if (a[key] > b[key]) {
      comparison = 1;
    }
    if (a[key] < b[key]) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

export { sortFunc };
