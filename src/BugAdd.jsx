import React from 'react';

export var BugAdd = React.createClass({
  render: function () {
    return (
      <div>
        <form name="bugAdd">
          <input type="text" name="owner" placeholder="Owner"/>
          <input type="text" name="title" placeholder="Title"/>
          <button onClick={this.handleSubmit}>Add Bug</button>
        </form>
      </div>
    )
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'});
    // clear the form for the next input
    form.owner.value = "";
    form.title.value = "";
  }
});

export default BugAdd;
