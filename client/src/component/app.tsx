import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    </Route>
  )
);
const App = () => {
  return (
        <RouterProvider router={router} />

  );
};

export default App;
