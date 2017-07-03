import React from 'react';

import BugFilter from './BugFilter.jsx';
import BugAdd from './BugAdd.jsx';


var BugRow = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.bug._id}</td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    )
  }
});

var BugTable = React.createClass({
  render: function () {
    var bugRows = this.props.bugs.map(function (bug) {
      return <BugRow key={bug._id} bug={bug}/>
    });
    return (
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Owner</th>
          <th>Title</th>
        </tr>
        </thead>
        <tbody>
        {bugRows}
        </tbody>
      </table>
    )
  }
});

var BugList = React.createClass({
  getInitialState: function () {
    return {bugs: []};
  },
  render: function () {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter submitHandler={this.loadData}/>
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this.addBug}/>
      </div>
    )
  },

  componentDidMount: function () {
    this.loadData({});
  },
  loadData: function(filter) {
    const search = Object.keys(filter)
      .filter(k => filter[k] !== '')
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(filter[k])}`)
      .join('&');

    fetch(`/api/bugs?`+search).then(response =>
      response.json()
    ).then(bugs => {
      this.setState({bugs});
    }).catch(err => {
      console.log(err);
      // In a real app, we'd inform the user as well.
    });

    // In production, we'd also handle errors.

  },
  addBug: function (newBug) {
    console.log("Adding bug:", newBug);
    fetch('/api/bugs', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newBug),

    }).then(res => res.json()).then(bug => {
      var bugsModified = this.state.bugs.concat(bug);
      this.setState({bugs: bugsModified});
    }).catch(err => {
      // ideally, show error to user also.
      console.log('Error adding bug:', err);
    });
  }
});

export default BugList;