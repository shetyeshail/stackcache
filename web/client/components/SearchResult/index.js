import React, { Component } from 'react'
import classnames from 'classnames'
import style from './style.css'

class SearchResult extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  render() {
    return (
      <div className={style.normal}>
        <h3>this.props.title</h3>
        <p>this.props.content</p>
      </div>
    );
  }
}
export default SearchResult;
