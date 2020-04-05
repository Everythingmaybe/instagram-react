import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import PostHeader from "./PostHeader";
import LikeButton from "../buttons/LikeButton";
import IconButtonWrapper from "../buttons/IconButtonWrapper";
import CommentSender from "../comments/CommentSender";
import Comment from "../comments/Comment";

const PostWrapper = styled.article`
    margin-bottom: 60px;
    border-radius: 3px;
    border: 1px solid #dbdbdb;
`;

const PostImage = styled.img`
    display: block;
    width: 100%;
    height: auto;
`;

const avatar = 'https://scontent-arn2-2.cdninstagram.com/v/t51.2885-19/s150x150/44296648_251617955511393_1918479114218504192_n.jpg?_nc_ht=scontent-arn2-2.cdninstagram.com&_nc_ohc=i0-8EfQJq1QAX-MKEL9&oh=38f4d22bcaa763a37bca85da5eb0ba2b&oe=5EB08A8D';
// const postImage = 'https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/91797446_541049243513649_8341866240313259332_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=109&_nc_ohc=zSP6CLQFypAAX8aC_r4&oh=f8818ee21802f04fc87d9296145734b4&oe=5EB380ED';
const likesCount = 1205000;

const Post = ({ profileName, postImage }) => {

    const send = (event) => {
        event.preventDefault();
        console.log(event.target.text.value);
    };

    return (
        <PostWrapper>
            <PostHeader profileName='Nikolay'
                        avatar={ avatar }
                        additionalInfo='Omsk, Russia'/>

            <div className='post-content'>
                <PostImage src={ postImage }/>
            </div>

            <div className='post-actions'>
                <section className="actions d-flex padding">
                    <LikeButton style={{ marginLeft: '-8px' }}/>
                    <IconButtonWrapper>
                        <FontAwesomeIcon icon={ faComment }/>
                    </IconButtonWrapper>
                    <IconButtonWrapper>
                        <FontAwesomeIcon icon={ faPaperPlane }/>
                    </IconButtonWrapper>
                    <IconButtonWrapper style={{ marginLeft: 'auto', marginRight: '-8px' }}>
                        <FontAwesomeIcon icon={ faBookmark }/>
                    </IconButtonWrapper>
                </section>

                <section style={{ marginBottom: '8px' }}
                         className='padding'>
                    <button className='bold'
                            type='button'>
                        { likesCount.toLocaleString('ru-RU') } отметок "Нравится"
                    </button>
                </section>

                <div className="post-comments-wrapper padding">
                    <div className="post-description">
                        <Comment profile='nikolya_lya_lya'
                                 text='Some comment and etc!!!'/>
                    </div>
                    <div className="post-comments">
                        <Comment profile='some_user'
                                 text='Some comment and etc. Some comment and etc. Some comment and etc!!!'/>
                        <Comment profile='nikolya'
                                 text='Some comment and etc!!!'/>
                    </div>
                </div>

                <CommentSender onSend={send}/>
            </div>
        </PostWrapper>
    );
};

export default Post;
