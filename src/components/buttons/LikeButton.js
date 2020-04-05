import React from "react";
import styled, { keyframes } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { fadeIn, pulse, merge } from 'react-animations';

import { colors } from "../../constans/styles";
import IconButtonWrapper from "./IconButtonWrapper";

const Bounce = styled.span`
    animation: 0.3s ${keyframes`${pulse}`};
    display: inline-block;
`;
// TODO: Change animation
const InAnimation = styled.span`
    animation: 0.2s ${keyframes`${ merge(fadeIn, pulse) }`};
    display: inline-block;
`;

const LikeButton = (props) => {
    return (
        <IconButtonWrapper { ...props }>
            { props.liked
                ? <Bounce>
                    <FontAwesomeIcon icon={ fasHeart } color={ colors.red }/>
                  </Bounce>
                : <InAnimation><FontAwesomeIcon icon={ farHeart }/></InAnimation>
            }
        </IconButtonWrapper>
    );
};

export default LikeButton;
