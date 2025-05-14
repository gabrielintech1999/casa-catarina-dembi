import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userCookie } from "~/utils/cookie";
import type { Route } from "./+types/RootLayout";

export async function loader({ request }: Route.LoaderArgs) {
  // await requireAuth(request);

  let cookieString = request.headers.get("Cookie");
  let user = await userCookie.parse(cookieString || "");

  return { user };
}

export default function RootLayout({ loaderData }: Route.ComponentProps) {
  const user = loaderData.user;

  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout;
    if (navigation.state === "loading") {
      timeout = setTimeout(() => setShowLoader(true), 300); // Delay para evitar flickers
    } else {
      clearTimeout(timeout);
      setShowLoader(false);
    }
    return () => clearTimeout(timeout);
  }, [navigation.state]);

  return (
    <div className="min-h-screen  ">
    <Header cart={cart} user={user} />
      <div
        className={`min-h-screen max-w-[1000px] m-auto relative transition-all duration-300 ${
          showLoader ? "opacity-50 blur-sm" : "opacity-100 blur-0"
        }`}
      >
        <Outlet context={{ cart, setCart, user }} />
        <Footer />
      </div>

      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="w-16 h-16 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
