import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import LikeButton from "../buttons/LikeButton";
import IconButtonWrapper from "../buttons/IconButtonWrapper";
import {MemoDecorator} from "../../containers/decorators";

const PostActions = MemoDecorator(({ liked, onLike }) => {
    console.log('render PostActions');
    return (
        <section className="d-flex padding">
            <LikeButton onClick={onLike} liked={liked} style={{ marginLeft: '-8px' }}/>
            <IconButtonWrapper disabled={true}>
                <FontAwesomeIcon icon={ faComment }/>
            </IconButtonWrapper>
            <IconButtonWrapper disabled={true}>
                <FontAwesomeIcon icon={ faPaperPlane }/>
            </IconButtonWrapper>
            <IconButtonWrapper style={{ marginLeft: 'auto', marginRight: '-8px' }}
                               disabled={true}>
                <FontAwesomeIcon icon={ faBookmark }/>
            </IconButtonWrapper>
        </section>
    )
})

export default PostActions
