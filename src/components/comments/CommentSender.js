import React, { useState } from "react";
import styled from "styled-components";
import '../../App.css';
import {MemoDecorator} from "../../containers/decorators";

const CommentSenderWrapper = styled.section`
    border-top: 1px solid #efefef;
    min-height: 56px;
    margin-top: 4px;
    display: flex;
    align-items: center;
`;

const SendForm = styled.form`
    display: flex;
    align-items: center;
    flex-grow: 1;
`;

const TextArea = styled.textarea`
    max-height: 80px;
    height: 18px;
    flex-grow: 1;
    outline: 0;
    padding: 0;
    resize: none;
    background: 0 0;
    border: 0;
    color: #262626;
`;

const CommentSender = MemoDecorator(({ onSend, disabled }) => {
    const [ text, setText ] = useState('');

    console.log('Render CommentSender');

    const sendComment = (event) => {
        event.persist();
        onSend(text);
        setText('');
    };

    const onChangeText = ({ target: { value } }) => {
        setText(value);
    };

    const onEnterPress = (e) => {
        if(e.key.toLowerCase() === 'enter') {
            sendComment(e);
        }
    }

    return (
        <CommentSenderWrapper className='padding'>
            <SendForm>
                <TextArea placeholder='Добавьте комментарий...'
                          name='text'
                          value={ text }
                          disabled={ disabled }
                          onKeyDown={ onEnterPress }
                          onChange={onChangeText} />
                <button className='action-button'
                        onClick={sendComment}
                        disabled={ !text.length || disabled }
                        type='submit'>Опубликовать</button>
            </SendForm>
        </CommentSenderWrapper>
    );
});

export default CommentSender;
