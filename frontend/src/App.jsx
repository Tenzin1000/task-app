import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Menu from "./view/Menu";
import RootLayout from "./Layout/RootLayout";
import Users from "./view/Users";
import NotFound from "./Layout/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Menu />} />
        <Route path="/user" element={<Users />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
