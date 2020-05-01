import "nodelist-foreach-polyfill";
import "whatwg-fetch";
import "../css/style.scss";
import Report from "./report/report";

const bisnessColumns = [
  {
    field: "displayName",
    title: "Display title",
    template: `<strong>#displayName#</strong>`,
    filter: false,
    sort: false,
  },
  {
    field: "path",
    title: "Path",
    template: `<small>#path#</small>`,
    filter: false,
    sort: false,
  },
  {
    field: "displays",
    title: "Displays",
    filter: true,
    sort: true,
  },
  {
    field: "clicks",
    title: "Clicks",
    filter: true,
    sort: true,
  },
  {
    field: "orders",
    title: "Purchases",
    filter: true,
    sort: true,
  },
  {
    field: "addToCarts",
    title: "Add to cart",
    filter: true,
    sort: true,
  },
  {
    field: "units",
    title: "Sold units",
    filter: true,
    sort: true,
  },
  {
    field: "revenue",
    title: "Revenue",
    filter: true,
    sort: true,
  },
  {
    field: "profit",
    title: "Profit",
    filter: true,
    sort: true,
  },
];

const productColumns = [
  {
    field: "displayName",
    title: "Display title",
    template: `
      <div><strong>#displayName#</strong></div>
      <div><small>#productKey#</small></div>
      <img src="#image#" />
    `,
    filter: false,
    sort: false,
  },
  {
    field: "displays",
    title: "Displays",
    filter: true,
    sort: true,
  },
  {
    field: "clicks",
    title: "Clicks",
    filter: true,
    sort: true,
  },
  {
    field: "orders",
    title: "Purchases",
    filter: true,
    sort: true,
  },
  {
    field: "abandonedUnits",
    title: "Abandoned Units",
    filter: true,
    sort: true,
  },
  {
    field: "soldUnits",
    title: "Sold units",
    filter: true,
    sort: true,
  },
  {
    field: "revenue",
    title: "Revenue",
    filter: true,
    sort: true,
  },
  {
    field: "profit",
    title: "Profit",
    filter: true,
    sort: true,
  },
];

const bisnessReports = document.querySelector("#bisness-reports");
const productReports = document.querySelector("#product-reports");

if (bisnessReports) {
  new Report("../data/panels-data.json", {
    element: "#bisness-reports",
    itemsPerPage: 10,
    columns: bisnessColumns,
  });
}

if (productReports) {
  new Report("../data/product-data.json", {
    element: "#product-reports",
    itemsPerPage: 10,
    columns: productColumns,
  });
}
