/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import {
    adminRouter,
    publicRouter,
    privateRouter,
} from './Routers/routersRender';
import { DefaultLayout } from './Layouts';
import routers from './Routers/routers';
import { useAppContext, store } from './utils';

function App() {
    const { state } = useAppContext();
    const { currentUser } = state;
    const history = useNavigate();
    const Routers =
        currentUser?.role === 'admin'
            ? adminRouter
            : currentUser?.role === 'user'
            ? privateRouter
            : publicRouter;
    useEffect(() => {
        if (!currentUser) {
            history(`${routers.login}`);
        } else {
            store.setStore(currentUser);
        }
    }, []);
    return (
        <>
            <div className='app'>
                <Routes>
                    {Routers.map((route, index) => {
                        const Cp = route.layout
                            ? route.layout
                            : route.layout === null
                            ? Fragment
                            : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Cp>
                                        <Page />
                                    </Cp>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </>
    );
}

export default App;
