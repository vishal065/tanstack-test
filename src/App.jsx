import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import FetchRQ from "./pages/FetchRQ";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FetchById from "./components/UI/FetchById";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rq",
        element: <FetchRQ />,
      },
      {
        path: "/rq/:id",
        element: <FetchById />,
      },
    ],
  },
]);

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router}></RouterProvider>;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
