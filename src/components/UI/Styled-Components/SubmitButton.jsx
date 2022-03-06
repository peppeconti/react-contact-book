import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
& {
    width: 100%;
    height: 6vh;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    border: none;
    border-radius: 4vh;
    background-color: ${props => props.color ? props.color : '#ecb2ba'};
    box-shadow: 3px 3px 5px #2d2d2d;
    cursor: pointer;
    font-size: 5vh;
    margin: 0;
}
&:hover {
    opacity: .8;
    box-shadow: 5px 5px 5px #2d2d2d;
}
`;

const SubmitButton = (props) => {

    return (
        <Button color={props.color} type="submit" disabled={props.disabled}>{props.text}</Button>
    )
}

export default SubmitButton;