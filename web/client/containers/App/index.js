
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as TodoActions from '../../actions/todos'
import style from './style.css'
import SearchResult from '../../components/SearchResult'

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
  }

  render() {

    const { todos, actions, children } = this.props
    return (
      <div className={style.normal}>
        <input className={style.searchbox} type="text"/>
        <input className={style.searchbutton} type="submit"/>
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
