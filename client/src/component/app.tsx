import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {dark, light} from '../config/theme';
import {useTypeSelector} from '../hooks/useTypeSelector';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
        </Route>
    )
);
const App = () => {

    const {themes} = useTypeSelector((state) => state.theme);


    return (
        <ThemeProvider theme={themes == 'dark' ? dark : light}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
};
export default App;
