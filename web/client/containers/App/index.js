
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
        {
          title: "dfdf",
          content: "dsfasddfefrhjkl;frsdfhjkl;jio;34r534789789r347890347892345789034578902345789078903457890234578902345"
        },
        {
          title: "dfdf",
          content: "dsfasddf"
        },
        {
          title: "dfdf",
          content: "dsfasddf"
        },
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
        <input ref="textBox" className={style.searchbox} type="text"/>
        <input className={style.searchbutton} onClick={this.getSearchResult} type="submit"/>
        <div className={style.resultscontainer}>
        {this.state.searchResult.map((d, i) => {
          return <SearchResult key={i} title={d.title} content={d.content}/>
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
