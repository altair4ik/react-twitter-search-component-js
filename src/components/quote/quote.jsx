import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TwitterTextHelper from '../../helpers/twitter-text.helper';

const QuoteBlock = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.span`
  font-weight: 600;
`;

const UserName = styled.span`
  margin-left: 10px;
  color: #949494;
`;

const Body = styled.div`
  margin-top: 5px;
  display: flex;
`;

export default class Quote extends Component {
    render() {
        const { data } = this.props;
        const quoteText = TwitterTextHelper.textLinkify(data);
        return (
            <QuoteBlock>
                <Header>
                    <Name>{data.user.name}</Name>
                    <UserName>
                        @
                        {data.user.screen_name}
                    </UserName>
                </Header>
                <Body>
                    <p dangerouslySetInnerHTML={{ __html: quoteText }} />
                </Body>
            </QuoteBlock>
        );
    }
}

Quote.propTypes = {
    data: PropTypes.any.isRequired,
};
