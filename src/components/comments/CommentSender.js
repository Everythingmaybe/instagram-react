import React, {useState} from "react";
import styled from "styled-components";
import '../../App.css';

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

const CommentSender = ({ onSend, disabled }) => {
    const [ text, setText ] = useState('');

    const sendComment = (event) => {
        event.preventDefault();
        onSend(text);
        setText('');
    };

    const onChangeText = ({ target: { value } }) => {
        setText(value);
    };

    const onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
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
};

export default CommentSender;
