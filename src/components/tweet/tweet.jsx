import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VerifyIcon from '../../assets/img/ic-verify.png';
import LogoIcon from '../../assets/img/logo.png';
import FavoriteIcon from '../../assets/img/favorite.png';
import CreateDate from '../create-date';
import Quote from '../quote';
import TwitterTextHelper from '../../helpers/twitter-text.helper';

const TweetBlock = styled.div`
  margin-top: 5px;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 15px;
  border-bottom: none;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`;

const Header = styled.div`
  display: flex;
  position: relative;
`;

const Logo = styled.span`
  position: absolute;
  right: 0;

  &::before {
            content: url(${LogoIcon});
        }
`;

const Verify = styled.span`
  &::before {
            content: url(${VerifyIcon});
        }
`;

const Count = styled.span`
    color: #949494;
    margin-right: 15px;
`;

const FavoriteCount = styled.span`
  margin-right: 5px;
  
  &::before {
            content: url(${FavoriteIcon});
        }
`;

const Body = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Avatar = styled.img`
  border-radius: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
`;

const Name = styled.span`
  font-weight: 600;
`;

const UserName = styled.span`
  color: #949494;
`;

const DateWrapper = styled.div`
  display: flex;
  align-item: end;
  margin-top: 10px
`;

const ViewOnTwitterWrapper = styled.div`
  border: 1px solid #e2e2e2;
  display: flex;
  justify-content: center;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const ViewOnTwitter = styled.a`
    text-decoration: none;
`;

export default class Tweet extends Component {
    render() {
        const { data } = this.props;
        console.log(data);
        const tweetText = TwitterTextHelper.textLinkify(data);
        return (
            <div>
                <TweetBlock>
                    <Header>
                        <Avatar src={data.user.profile_image_url} alt="profile img" />
                        <UserInfo>
                            <Name>
                                {data.user.name}
                                {data.user.verified ? <Verify /> : null}
                            </Name>
                            <UserName>
                            @
                                {data.user.screen_name}
                            </UserName>
                        </UserInfo>
                        <Logo />
                    </Header>
                    <Body>
                        <p dangerouslySetInnerHTML={{ __html: tweetText }} />
                    </Body>
                    { data.quoted_status ? <Quote data={data.quoted_status} /> : null }
                    <DateWrapper>
                        <FavoriteCount />
                        <Count>{(data.favorite_count > 0) ? data.favorite_count : null}</Count>
                        <CreateDate date={data.created_at} />
                    </DateWrapper>
                </TweetBlock>
                <ViewOnTwitterWrapper>
                    <ViewOnTwitter href={`https://twitter.com/statuses/${data.id_str}`}>View on Twitter</ViewOnTwitter>
                </ViewOnTwitterWrapper>
            </div>
        );
    }
}

Tweet.propTypes = {
    data: PropTypes.any.isRequired,
};
