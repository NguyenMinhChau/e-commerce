/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {
    adminRouter,
    publicRouter,
    privateRouter,
} from './Routers/routersRender';
import { DefaultLayout } from './Layouts';
import routers from './Routers/routers';
import { useAppContext, store } from './utils';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Image } from './Components';

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
        <PayPalScriptProvider
            options={{
                'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
            }}
        >
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
                <div className='nosupport'>
                    <Image
                        src='/svgs/metaImage.svg'
                        slt='logo'
                        className='image-nosupport'
                    />
                    <div className='nosupport-desc'>
                        Website hiện chưa hỗ trợ trên thiết bị này.
                    </div>
                </div>
            </>
            <MessengerCustomerChat
                pageId='104145032476041'
                appId='468033418602915'
            />
        </PayPalScriptProvider>
    );
}

export default App;
