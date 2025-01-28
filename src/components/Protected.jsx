import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {


  const user = {}

  if (!user) {
    console.log("OK");
     return <Navigate to="/auth" />;
  }

  return (
    <Outlet />
  );
}

{/* <Route path="/carinho-de-compras" element={<Cart />} />
          <Route path="/perfil" element={<Profile />} /> */}
