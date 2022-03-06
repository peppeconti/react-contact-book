import { useState } from "react";

const useInput = (validateValue) => {

    const [enteredValue, setEnteredValue] = useState('');

    const valueIsValid = validateValue(enteredValue);

    const error = !valueIsValid;

    const valueChangeHandler = (e) => {
        setEnteredValue(e.target.value);
    };

    const resetValue = () => {
        setEnteredValue('');
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: error,
        valueChangeHandler,
        setEnteredValue,
        resetValue
    };
};

export default useInput;