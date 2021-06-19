import axios from "axios";

export const saveUserDataToLocalStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify({
        userId: user._id,
        token: token
    }))
}

export const setupAuthHeaderForServiceCalls = (token) => {    
    if (token) {
        console.log("HEADER SET");
        return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
}

export const setupAuthExceptionHandler = (dispatch, signOutUser, navigate, toast) => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === UNAUTHORIZED) {
                toast({
                    position: 'bottom-right',
                    title: `Session Expired`,
                    description: "Please login again to continue.",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
                dispatch(signOutUser());
                navigate("signin");
            }
            return Promise.reject(error);
        }
    );
}