import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ProviderContext } from './app/';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/Table.css';
import './styles/Status.css';
import './styles/Products.css';
import './styles/ModalConfirm.css';
import './styles/MenuUser.css';
import './styles/Sidebar.css';
import './styles/Pagination.css';
import './styles/General.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ProviderContext>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ProviderContext>
    </React.StrictMode>
);
reportWebVitals();
