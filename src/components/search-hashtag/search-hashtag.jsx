import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import Hashtag from '../hashtag';
import Tweet from '../tweet';
import SortTypeEnum from '../../enums/sortType.enum';

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
  width: 100%;
`;

class SearchHashtag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hashtags: [],
            tweetsItems: [],
            sortType: SortTypeEnum.BY_DATE,
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
      if (event.key === 'Enter') {
          if (event.currentTarget.value === '') {
              return;
          }
          const { hashtags } = this.state;
          hashtags.push(`#${event.currentTarget.value}`);
          event.currentTarget.value = '';
          this.setState({ hashtags });
          this.onHashtagsChange();
      }
  }

  onHashtagsChange = () => {
      const { apiUrl } = this.props;
      const { hashtags } = this.state;
      this.searchTweets(hashtags.join(' '), apiUrl)
          .then(result => result.json(),
              (error) => {
                  console.log('error: ', error);
              }).then((data) => {
              const tweetsItems = JSON.parse(data.data);
              this.setState({ tweetsItems });
          });
  }

  compareByDate = (a, b) => {
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

  compareByFavorite = (a, b) => {
      if (a.props.data.favorite_count < b.props.data.favorite_count) {
          return 1;
      }
      if (a.props.data.favorite_count > b.props.data.favorite_count) {
          return -1;
      }
      return 0;
  }

    sortChange = (event) => {
        this.setState({ sortType: event.target.value });
    };

    render() {
        const { tweetsItems } = this.state;
        const del = (index) => {
            const { hashtags } = this.state;
            hashtags.splice(index, 1);
            if (hashtags.length > 0) {
                this.onHashtagsChange();
            }
            this.setState({ hashtags });
        };
        const { hashtags } = this.state;
        const items = hashtags.map((item, index) => {
            const keyId = `${item}${index}`;
            return <Hashtag index={index} del={del} text={item} key={keyId} />;
        });
        let tweets = [];
        if (tweetsItems.statuses) {
            tweets = tweetsItems.statuses.map(item => (
                <Tweet key={item.id} data={item} />
            ));
            const { sortType } = this.state;
            tweets.sort(sortType === SortTypeEnum.BY_DATE ? this.compareByDate : this.compareByFavorite);
        }
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
                    {tweets.length > 0 ? (
                        <SortSelect onChange={this.sortChange}>
                            <option value={SortTypeEnum.BY_DATE}>By date</option>
                            <option value={SortTypeEnum.BY_FAVORITE}>By favorite</option>
                        </SortSelect>
                    ) : null
                    }
                </SortSelectWrapper>
                <TweetsWrapper>
                    {tweets}
                </TweetsWrapper>
            </div>
        );
    }
}

SearchHashtag.propTypes = {
    apiUrl: PropTypes.string.isRequired,
};

export default SearchHashtag;
