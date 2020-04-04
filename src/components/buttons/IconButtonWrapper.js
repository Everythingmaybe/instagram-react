import React from "react";
import styled from "styled-components";

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    font-size: 24px;
    line-height: .9;
    &:focus {
        outline: 0;
    }
`;

const IconButtonWrapper = ({ onClick, children, style }) => {
    return (
        <IconButton style={ style }
                    onClick={onClick}
                    type='button'>
            { children }
        </IconButton>
    );
};

export default IconButtonWrapper;
