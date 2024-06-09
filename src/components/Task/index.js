import './index.css'
import {Component} from 'react'
import {v4} from 'uuid'
import TagButtons from '../TagButtons'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Task extends Component {
  state = {
    userInput: '',
    selectOptionId: tagsList[0].optionId,
    userTaskList: [],
    activeTab: 'INITIAL',
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeSelectValue = event => {
    this.setState({selectOptionId: event.target.value})
  }

  onChangeActiveTab = tagId => {
    this.setState(prevState => ({
      activeTab: prevState.activeTab === tagId ? 'INITIAL' : tagId,
    }))
  }

  addFormListItem = event => {
    event.preventDefault()
    const {userInput, selectOptionId} = this.state
    const newObject = {
      id: v4(),
      inputText: userInput,
      optionId: selectOptionId,
    }
    this.setState(prevState => ({
      userTaskList: [...prevState.userTaskList, newObject],
      userInput: '',
      selectOptionId: tagsList[0].optionId,
    }))
  }

  renderTaskListItems = () => {
    const {activeTab, userTaskList} = this.state
    const filteredItems =
      activeTab === 'INITIAL'
        ? userTaskList
        : userTaskList.filter(eacItem => eacItem.optionId === activeTab)
    return (
      <ul className="userTask-list">
        {filteredItems.map(eachTask => (
          <li key={eachTask.id} className="userTask-list-item">
            <p className="userTask-text">{eachTask.inputText}</p>
            <p className="userTag-text">{eachTask.optionId}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {activeTab, selectOptionId, userInput, userTaskList} = this.state
    return (
      <div className="app-bgcontainer">
        <div className="create-taskcontainer">
          <form className="form-container" onSubmit={this.addFormListItem}>
            <h1 className="main-heading">Create a task!</h1>
            <div className="input-container">
              <label htmlFor="inputText" className="label-text">
                Task
              </label>
              <input
                type="text"
                placeholder="Enter the task here"
                className="inputElement"
                id="inputText"
                value={userInput}
                onChange={this.onChangeUserInput}
              />
            </div>
            <div className="input-container">
              <label htmlFor="selectTag" className="label-text">
                Tags
              </label>
              <select
                id="selectTag"
                className="inputElement"
                value={selectOptionId}
                onChange={this.onChangeSelectValue}
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-view-container">
          <h1 className="task-view-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachTag => (
              <TagButtons
                key={eachTag.optionId}
                tagDetails={eachTag}
                isActive={eachTag.optionId === activeTab}
                changeActiveTab={this.onChangeActiveTab}
              />
            ))}
          </ul>
          <h1 className="task-view-heading">Tasks</h1>
          {userTaskList.length === 0 ? (
            <p className="noTask-heading">No Tasks Added Yet</p>
          ) : (
            this.renderTaskListItems()
          )}
        </div>
      </div>
    )
  }
}
export default Task
