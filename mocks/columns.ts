const columns = [
  {
    field: "name",
    title: "Name",
    filter: false,
    sort: false,
  },
  {
    field: "id",
    title: "ID",
    filter: true,
    sort: true,
  },
  {
    field: "age",
    title: "Age",
    filter: true,
    sort: true,
  },
];

const filterColumns = [
  {
    field: "id",
    title: "ID",
    filter: true,
    sort: true,
  },
  {
    field: "age",
    title: "Age",
    filter: true,
    sort: true,
  },
];

export { columns, filterColumns };
