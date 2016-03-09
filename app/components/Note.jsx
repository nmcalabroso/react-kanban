import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.renderEdit = this.renderEdit.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
    this.renderNote = this.renderNote.bind(this);

    this.edit = this.edit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);

    this.state = {};
    this.state.editing = false;
  }

  render() {
    if(this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }

  renderEdit() {
    return (
      <input type="text"
        ref={ (e) => e ? e.selectionStart = this.props.task.length : null }
        autoFocus={ true }
        defaultValue={ this.props.task }
        onBlur={ this.finishEdit }
        onKeyPress={ this.checkEnter } />
    );
  }

  renderDelete() {
    return <button className="delete-note" onClick={ this.props.onDelete }>x</button>;
  }

  renderNote() {
    const onDelete = this.props.onDelete;
    return (
      <div onClick={ this.edit }>
        <span className="task">{ this.props.task }</span>
        { onDelete ? this.renderDelete() : null }
      </div>
    );
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  checkEnter(e) {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    const value = e.target.value;
    console.log(this.props);
    if(this.props.onEdit) {
      this.props.onEdit(value);
      this.setState({
        editing: false
      });
    }
  };
}
