import React from 'react';
// IMPORT STYLED COMPONENT
import styled from 'styled-components';
// BOOTSTRAP COMPS
import Row from 'react-bootstrap/Row';

const Input = styled.input`
& {
    position: relative;
    color: transparent;
    background-color: #fff;
    width: inherit;
    height: inherit;
    font-family: inherit;
    border-radius: 4vh;
    padding: 0 1vh;
    font-size: 3vh;
    border: none;
    display: block;
    cursor: pointer;
}
&:hover {
    opacity: .9;
}
&::-webkit-file-upload-button {
    visibility: hidden;
}
&:after {
    content: '+';
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5vh;
    height: 5vh;
    color: white;
    top: calc(50% - 2.5vh);
    left: calc(50% - 2.5vh);
    background-color: ${props => props.color ? props.color : 'rgb(176, 176, 255)'};
    border-radius: 50%;
    border: 2px solid white;
    font-size: 4vh;
    font-weight: 800;
}
`;

const Label = styled.label`
& {
    padding: 0 1vh;
    display: inline-block;
    text-align: left;
    font-size: 3.5vh;
    height: 5.5vh;
}`;

const inputContainer = {
    position: 'relative',
    width: '100%',
    height: '6vh',
    padding: '0'
};

const warningPar = {
    fontSize: '2vh',
    padding: '.5vh 1vh',
    color: 'rgb(255, 104, 104)'
};

const InputFile = ({ inputId, label, color, onInputChange, fileList, inputFileHasError, warning }) => {

    return (
        <Row className='w-100 no-gutters py-2 m-0'>
            <Label htmlFor={inputId}>{label}</Label>
            <div style={inputContainer}>
                <Input ref={fileList} id={inputId} type='file' accept='.png, .jpg, .jpeg, .webp' color={color} onChange={onInputChange} />
                {inputFileHasError && <p style={warningPar}>{warning}</p>}
            </div>
        </Row>
    );
};

export default InputFile;