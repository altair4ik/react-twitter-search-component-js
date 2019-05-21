import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateBlock = styled.span`
  color: #949494;
`;

export default class CreateDate extends Component {
    render() {
        const { date } = this.props;
        const dateObj = new Date(date);
        const momentObj = moment(dateObj);
        const momentString = momentObj.format('HH:mm - MMM DD, YYYY');
        return (
            <DateBlock>{momentString}</DateBlock>
        );
    }
}

CreateDate.propTypes = {
    date: PropTypes.string.isRequired,
};
