import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import '../../App.css';

const PostHeaderWrapper = styled.header`
    display: flex;
    padding: 16px;
    height: 60px;
    border-bottom: 1px solid #efefef;
`;

const AvatarWrapper = styled.div`
    display: inline-flex;
    align-items: center;
`;

const InfoWrapper = styled.div`
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;


const PostHeader = ({ profileName, additionalInfo, avatar }) => {
    return (
        <PostHeaderWrapper>

            <AvatarWrapper>
                <Avatar avatarImage={ avatar }/>
            </AvatarWrapper>

            <InfoWrapper>
                <div>
                    <a href="#">{ profileName }</a>
                </div>
                { additionalInfo
                    ? <div className='d-flex'><a className='small'
                              href="#">{ additionalInfo }</a></div>
                    : ''
                }
            </InfoWrapper>

        </PostHeaderWrapper>
    );
};

export default PostHeader;
