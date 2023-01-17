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
import Global from './styled/Global';
import Layout from './styled/organism/Layout';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Layout/>}>
            </Route>
        </Route>
    )
);
const App = () => {

    const {themes} = useTypeSelector((state) => state.theme);


    return (
        <ThemeProvider theme={themes == 'dark' ? dark : light}>
            <Global/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
};
export default App;
