import React from "react";
import styled from "styled-components";

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    font-size: ${ ({ small }) => small ? '12px' : '24px' };
    line-height: .9;
    &:focus {
        outline: 0;
    }
`;

const IconButtonWrapper = (props) => {
    return (
        <IconButton { ...props }
                    type='button'>
            { props.children }
        </IconButton>
    );
};

export default IconButtonWrapper;
