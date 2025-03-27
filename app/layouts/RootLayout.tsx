import { Outlet } from "react-router";
import Footer from "~/components/Footer";
import NavBar from "~/components/Navbar";

export default function RootLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
