import { useCallback, useState } from 'react';

const useAuth = (authFunction, callbackSuccess = Function, callbackFailure = Function, auth, email = null, password = null) => {

    const [hasError, setHasError] = useState('');

    const authFunctionHandler = useCallback(() => {
        authFunction(auth, email, password)
            .then((userCredentials) => {
                callbackSuccess(userCredentials);
            })
            .catch((err) => {
                // console.log(err.code);
                setHasError(err.code);
                callbackFailure();
            })
    }, [authFunction, auth, email, password, callbackFailure, callbackSuccess]);

    const resetError = () => {
        setHasError('');
    }

    return {
        authFunctionHandler: authFunctionHandler,
        errorMessage: hasError,
        resetError
    };

};

export default useAuth;