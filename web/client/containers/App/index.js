
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import * as TodoActions from '../../actions/todos'
import style from './style.css'
import SearchResult from '../../components/SearchResult'

class App extends Component {

  render() {
    var sample = [
      {
        title: "dfdf",
        content: "dsfasddf"
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

    const { todos, actions, children } = this.props
    return (
      <div className={style.normal}>
        <input className={style.searchbox} type="text"/>
        <input className={style.searchbutton} type="submit"/>
        <div className={style.resultscontainer}>
        {sample.map((d) => {
          return <SearchResult title={d.title} content={d.content}/>
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
