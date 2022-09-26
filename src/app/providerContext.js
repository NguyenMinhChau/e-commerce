import PropTypes from 'prop-types';
import { useReducer } from 'react';
import reducer, { initialState } from './reducer';
import AppContext from './createContext';

const ProviderContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

ProviderContext.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProviderContext;
