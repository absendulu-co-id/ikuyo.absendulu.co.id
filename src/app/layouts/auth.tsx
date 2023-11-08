import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/app/components";
import { routesAuth } from "../routes";

export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routesAuth.map(
          ({ layout, pages }) =>
            pages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))
          )}
        {/* {routesAuth.map(
          ({ layout, pages }) =>
            // pages.map(({ path, element }) => (
            //   <Route path={path} element={element} />
            // ))
        )} */}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
