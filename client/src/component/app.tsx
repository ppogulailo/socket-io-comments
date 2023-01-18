import React, { useEffect } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {dark, light} from '../config/theme';
import {useTypeSelector} from '../hooks/useTypeSelector';
import { AuthProvider } from './hoc/auth.provider';
import Global from './styled/Global';
import Layout from './styled/organism/Layout';
import { checkAuth } from '../redux/thunk/auth.thunk';
import { AuthPage } from '../page/auth.page';
import { RequireAuthProvider } from './hoc/require-auth.provider';
import { PostPage } from '../page/post.page';
import { useAppDispatch } from '../redux/actions/actions';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Layout/>}>
                <Route
                    path="/"
                    element={
                        <RequireAuthProvider>
                            <PostPage />
                        </RequireAuthProvider>
                    }
                />
            </Route>
            <Route path="/login" element={<AuthPage />} />
        </Route>
    )
);
const App = () => {
    const dispatch=useAppDispatch()
    const {themes} = useTypeSelector((state) => state.theme);
    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            dispatch(checkAuth());
        }
    }, []);

    return (
        <ThemeProvider theme={themes == 'dark' ? dark : light}>
            <Global />
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>
    );
};
export default App;
