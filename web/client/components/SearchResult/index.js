import React, { Component } from 'react'
import classnames from 'classnames'
import style from './style.css'

class SearchResult extends Component{

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
    this.openLink = this.openLink.bind(this);
  }

  openLink(){
    console.log(this.props.url);

    var win = window.open(this.props.url, '_blank');
    win.focus();
  }

  render() {
    return (
      <div className={style.normal} onClick={this.openLink}>
        <h3>{this.props.title}</h3>
        <div className={style.bodyContainer}>
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
}
export default SearchResult;
