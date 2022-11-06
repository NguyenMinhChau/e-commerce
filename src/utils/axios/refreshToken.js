import jwt_decode from 'jwt-decode';
import { store, api } from '../../utils';

const requestRefreshToken = async (
    currentUser,
    handleFunc,
    state,
    dispatch,
    actions,
    id
) => {
    try {
        const accessToken = currentUser?.token;
        if (accessToken) {
            const decodedToken = await jwt_decode(accessToken);
            const date = new Date();
            console.log(decodedToken.exp < date.getTime() / 1000);
            if (decodedToken.exp < date.getTime() / 1000) {
                const res = await api.refreshToken('refresh_token');
                const refreshUser = {
                    ...currentUser,
                    token: res.newToken.toString(),
                };
                await store.setStore(refreshUser);
                dispatch(
                    actions.setCurrentUser({
                        ...state.set,
                        currentUser: store.getStore(),
                    })
                );
                currentUser.token = `${res.newToken}`;
                handleFunc(refreshUser, id ? id : '');
                return refreshUser;
                // if (res.code === 0) {
                // } else {
                //     console.log('RefreshToken not found- Please login again');
                // }
            } else {
                handleFunc(currentUser, id ? id : '');
                return currentUser;
            }
        }
    } catch (err) {
        console.log(err);
    }
};
export default requestRefreshToken;
