import React from "react";
import styled from "styled-components";

const Link = styled.a`
    display: inline-block;
    width: 32px;
    height: 32px;
`;

const Image = styled.img`
    border-radius: 50%;
    max-width: 100%;
    max-height: 100%;
`;

// TODO: Need use avatarImage
const Avatar = ({ avatarImage, profile }) => {
    return (
        <Link href='/'>
            <Image src={ avatarImage }/>
        </Link>
    );
};

export default Avatar;
