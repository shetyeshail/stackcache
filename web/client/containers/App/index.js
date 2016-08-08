
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as TodoActions from '../../actions/todos'
import style from './style.css'
import SearchResult from '../../components/SearchResult'

import request from 'superagent';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      searchResult: [

      ]
    };
    this.getSearchResult = this.getSearchResult.bind(this);
  }

  getSearchResult(){
    console.log(this.refs.textBox.value);
    var queryJSON = {
      q: '' + this.refs.textBox.value
    };
    request.get("/api/documents")
    .set(queryJSON)
    //.set('Accept', 'application/json')
    .end((err, res) => {
      if(err){
        console.log('something went wrong')
      }else{
        console.log(res.text);
        var resultArray = JSON.parse(res.text);
        this.setState({
          searchResult: resultArray
        });
      }
    });

  }

  render() {

    const { todos, actions, children } = this.props
    return (
      <div className={style.normal}>
        <div className={style.headerContainer}>
          <div className={style.headerText}>
            <span>CacheStack</span>
          </div>
          <div className={style.header}>
            <input ref="textBox" className={style.searchbox} type="text"/>
            <input className={style.searchbutton} onClick={this.getSearchResult} type="submit"/>
          </div>
        </div>
        <div className={style.resultscontainer}>
        {this.state.searchResult.map((d, i) => {
          return <SearchResult key={i} title={d.title} content={d.content} url={d.path}/>
        })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
