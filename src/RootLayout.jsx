import { Outlet, useNavigation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      {navigation.state === 'loading' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl z-50">
          <div className="spinner"></div>
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  );
}
