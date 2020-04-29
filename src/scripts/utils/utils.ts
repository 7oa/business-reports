const sortFunc = (key: string, order: string = "asc") => {
  return (a: object, b: object) => {
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
