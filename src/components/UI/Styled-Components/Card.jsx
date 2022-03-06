import React from 'react';
// IMPORT STYLED COMPONENT
import styled from 'styled-components';

const Paper = styled.div`
& {
    position: relative;
    background: linear-gradient(to bottom right, ${props => props.dark ? props.dark : '#c6939a'}, 20%, rgba(255, 255, 255, 0)), ${props => props.light ? props.light : '#ecb2ba'};
    box-shadow: 1px 1px 2px ${props => props.light ? props.light : '#ecb2ba'};
    height: 100%;
    width: 100%;
    z-index: 2;
    border-radius: inherit;
}
&:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0), 50%, ${props => props.dark ? props.dark : '#c6939a'}, 51%, rgba(255, 255, 255, 0))${props => props.vertical ? `, linear-gradient(to right, rgba(255, 255, 255, 0), 50%, ${props.dark ? props.dark : '#c6939a'}, 51%, rgba(255, 255, 255, 0))` : ''};

}
`;

const Edge = styled.div`
& {
    position: absolute;
    width: 100%;
}
&:first-of-type {
    top: 0;
  }
  
&:last-of-type {
    bottom: 0;
  }
&:after,
&:before {
    content: "";
    width: 10vmin;
    height: 4vmin;
    position: absolute;
    background-color: #dbd8be;
    opacity: 0.5;
    border-right: 1px dotted #b7b49d;
    border-left: 1px dotted #b7b49d;
 }
&:last-of-type::after {
    transform: rotate(-45deg);
    right: -4vmin;
    top: -3vmin;
 }  
&:first-of-type::before {
    transform: rotate(-45deg);
    left: -4vmin;
 }  
&:first-of-type::after {
    transform: rotate(45deg);
    right: -4vmin;
    top: 0;
 } 
&:last-of-type::before {
    transform: rotate(45deg);
    left: -4vmin;
    bottom: 0;
 }`;

const Card = (props) => {

    return (
        <Paper dark={props.dark} light={props.light} vertical={props.vertical}>
            {props.edges && <Edge />}
            {props.children}
            {props.edges && <Edge />}
        </Paper>
    );
};

export default Card;