import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HashtagBlock = styled.div`
  background-color: #e8e8e8;
  border-radius: 15px;
  padding: 7px 6px 7px 10px;
  font-size: 14px;
  margin-left: 5px;
  
  &:first-child {
    margin-left: 0;
  }
`;

const Cross = styled.button`
  background-color: #b3b3b3;
  border-radius: 30px;
  color: #e8e8e8;
  border: none;
  margin-left: 5px;
`;

export default class Hashtag extends Component {
    render() {
        const { del, index } = this.props;
        const { text } = this.props;
        const delHashtag = () => {
            del(index);
        };
        return (
            <HashtagBlock>
                <span>{text}</span>
                <Cross onClick={delHashtag}>X</Cross>
            </HashtagBlock>
        );
    }
}

Hashtag.propTypes = {
    text: PropTypes.string.isRequired,
    del: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};
