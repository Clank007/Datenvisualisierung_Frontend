import Dashboard from "./views/Dashboard.js";
import Dashboard_2 from "./views/Dashboard_2.js";

const dashboardRoutes = [
  {
    path: "/schwundberechnung",
    name: "Schwundberechnung",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/studienverlauf",
    name: "Studienverlauf",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard_2,
    layout: "/admin"
  }
];

export default dashboardRoutes;