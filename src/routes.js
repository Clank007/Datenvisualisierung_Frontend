import DashboardKennzahlen from "./views/DashboardKennzahlen.js";
import DashboardSchwundberechnung from "./views/DashboardSchwundberechnung.js";
import DashboardStudienverlauf from "./views/DashboardStudienverlauf.js";
import Glossar from "./views/Glossar.js";

const dashboardRoutes = [
  {
    path: "/kennzahlen",
    name: "Kennzahlen",
    icon: "nc-icon nc-chart-pie-35",
    component: DashboardKennzahlen,
    layout: "/admin"
  },
  {
    path: "/schwundberechnung",
    name: "Schwundberechnung",
    icon: "nc-icon nc-chart-pie-35",
    component: DashboardSchwundberechnung,
    layout: "/admin"
  },
  {
    path: "/studienverlauf",
    name: "Studienverlauf",
    icon: "nc-icon nc-chart-pie-35",
    component: DashboardStudienverlauf,
    layout: "/admin"
  },
  {
    path: "/glossar",
    name: "Glossar",
    icon: "nc-icon nc-chart-pie-35",
    component: Glossar,
    layout: "/admin"
  }
];

export default dashboardRoutes;