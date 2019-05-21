import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import Hashtag from '../hashtag';
import Tweet from '../tweet';

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #c1bfbf;
  padding: 5px;
`;

const HashtagsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const SortSelectWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const SortSelect = styled.select`
  border: none;
  outline: none;
  border-bottom: 1px solid #c1bfbf;
  padding: 5px;
`;

const TweetsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 600px;
`;

class SearchHashtag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hashtags: [],
            tweetsItems: [],
        };
    }

  searchTweets = (searchStr, apiUrl) => (
      fetch(apiUrl, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({ data: searchStr }),
      })
  )

  keypressHandler = (event) => {
      const { apiUrl } = this.props;
      if (event.key === 'Enter') {
          const { hashtags } = this.state;
          hashtags.push(`#${event.currentTarget.value}`);
          event.currentTarget.value = '';
          this.setState({ hashtags });

          this.searchTweets(hashtags.join(' '), apiUrl)
              .then(result => result.json(),
                  (error) => {
                      console.log('error: ', error);
                  }).then((data) => {
                  const tweets = JSON.parse(data.data);
                  const tweetsItems = tweets.statuses.map(item => (
                      <Tweet key={item.id} data={item} />
                  ));
                  tweetsItems.sort(this.compareToDate);
                  this.setState({ tweetsItems });
              });
      }
  }

  compareToDate = (a, b) => {
      const aDate = new Date(a.props.data.created_at).getTime();
      const bDate = new Date(b.props.data.created_at).getTime();
      if (aDate < bDate) {
          return 1;
      }
      if (aDate > bDate) {
          return -1;
      }
      return 0;
  }

    sortChange = (event) => {
        const { tweetsItems } = this.state;
        if (event.target.value === 'date') {
            tweetsItems.sort(this.compareToDate);
        }
        if (event.target.value === 'favorite') {
            tweetsItems.sort((a, b) => {
                if (a.props.data.favorite_count < b.props.data.favorite_count) {
                    return 1;
                }
                if (a.props.data.favorite_count > b.props.data.favorite_count) {
                    return -1;
                }
                return 0;
            });
        }
        this.setState({ tweetsItems });
    };

    render() {
        console.log('render');
        const { apiUrl } = this.props;
        const { tweetsItems } = this.state;
        const del = (index) => {
            const { hashtags } = this.state;
            hashtags.splice(index, 1);
            if (hashtags.length > 0) {
                this.searchTweets(hashtags.join(' '), apiUrl)
                    .then(result => result.json(),
                        (error) => {
                            console.log('error: ', error);
                        }).then((data) => {
                        const tweets = JSON.parse(data.data);
                        const tweetsItemsUpdated = tweets.statuses.map(item => (
                            <Tweet key={item.id} data={item} />
                        ));
                        tweetsItemsUpdated.sort(this.compareToDate);
                        this.setState({ tweetsItems: tweetsItemsUpdated });
                    });
            }
            this.setState({ hashtags });
        };
        const { hashtags } = this.state;
        const items = hashtags.map((item, index) => {
            const keyId = `${item}${index}`;
            return <Hashtag index={index} del={del} text={item} key={keyId} />;
        });

        return (
            <div>
                <Input
                    type="text"
                    className="form-control search-input"
                    placeholder="Add hashtag..."
                    onKeyPress={this.keypressHandler}
                />
                <HashtagsWrapper>
                    {items}
                </HashtagsWrapper>
                <SortSelectWrapper>
                    {tweetsItems.length > 0 ? (
                        <SortSelect onChange={this.sortChange}>
                            <option value="date">By date</option>
                            <option value="favorite">By favorite</option>
                        </SortSelect>
                    ) : null
                    }
                </SortSelectWrapper>
                <TweetsWrapper>
                    {tweetsItems}
                </TweetsWrapper>
            </div>
        );
    }
}

SearchHashtag.propTypes = {
    apiUrl: PropTypes.string.isRequired,
};

export default SearchHashtag;
