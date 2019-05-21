import React, { Component } from 'react'

import ReactTwitterSearchComponent from 'react-twitter-search-component'

export default class App extends Component {
  render () {
    return (
      <div className={'wrapper'}>
        <ReactTwitterSearchComponent apiUrl={'http://localhost:3001/search'} />
      </div>
    )
  }
}
