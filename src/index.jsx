import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SearchHashtag from './components/search-hashtag';
import './styles.css';

const Wrapper = styled.div`
  padding 15px;
`;

export default class ReactTwitterSearchComponent extends Component {
    render() {
        const { apiUrl } = this.props;
        return (
            <Wrapper>
                <SearchHashtag apiUrl={apiUrl} />
            </Wrapper>
        );
    }
}

ReactTwitterSearchComponent.propTypes = {
    apiUrl: PropTypes.string.isRequired,
};
