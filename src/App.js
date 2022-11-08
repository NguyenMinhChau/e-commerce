/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ReactGA from 'react-ga';
import {
    adminRouter,
    publicRouter,
    privateRouter,
} from './Routers/routersRender';
import { DefaultLayout } from './Layouts';
import { useAppContext, store } from './utils';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { Image } from './Components';
import { CallMe } from './SocialPlugin';

function App() {
    const TRACKING_ID = 'UA-246415947-1';
    ReactGA.initialize(TRACKING_ID);
    const { state } = useAppContext();
    const { currentUser } = state;
    const Routers =
        currentUser?.role === 'admin'
            ? adminRouter
            : currentUser?.role === 'user'
            ? privateRouter
            : publicRouter;
    useEffect(() => {
        if (currentUser) {
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
                                            <CallMe />
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
