import './index.css'

const TagButtons = props => {
  const {tagDetails, isActive, changeActiveTab} = props
  const activeBtnStyle = isActive ? 'filled-button' : 'outline-button'
  const onClickTagButton = () => {
    changeActiveTab(tagDetails.optionId)
  }
  return (
    <li>
      <button
        type="button"
        className={activeBtnStyle}
        onClick={onClickTagButton}
      >
        {tagDetails.displayText}
      </button>
    </li>
  )
}
export default TagButtons
