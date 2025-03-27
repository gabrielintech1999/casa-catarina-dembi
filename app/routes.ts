import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/RootLayout.tsx", [
    index("routes/home.tsx"),
    route("/items/:name/:id", "routes/productdetail.tsx"),
    route("/lista-de-compras", "routes/cart.tsx"),
  ]),
  route("/perfil", "routes/dashboard.tsx"),
  route("/facturação", "routes/checkout.tsx"),
  route("/resultados", "routes/search.tsx"),
  route("/iniciar-sessao", "routes/signin.tsx"),
  route("/criar-conta", "routes/signup.tsx"),
  route("/sobre-nos", "routes/about.tsx"),
] satisfies RouteConfig;

// export default [
//   layout("layouts/RootLayout.tsx", [
//     index("routes/home.tsx"),
//     route("/cursos", "routes/courses.tsx"),
//     route("/example", "routes/example.tsx"),
//     route("/cursos/:course_name/:id", "routes/courseDetail.tsx"),
//   ]),
// ] satisfies RouteConfig;
