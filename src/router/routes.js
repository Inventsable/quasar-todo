const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      { path: "", name: "Todo", component: () => import("pages/PageTodo.vue") },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("pages/PageSettings.vue")
      },
      {
        path: "/settings/help",
        name: "Help",
        component: () => import("pages/PageHelp.vue")
      },
      // { path: "/user", component: () => import("pages/PageUser.vue") },
      {
        path: "/joystick",
        name: "Joystick",
        component: () => import("pages/PageJoystick.vue")
      },
      {
        path: "/auth",
        name: "Auth",
        component: () => import("pages/PageAuth.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
