import React, { Component } from 'react';
import { Grid, Row, Col, Tabs, Tab, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import request from 'superagent'


import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Body />
      </div>
    );
  }
}
export default App;

class Body extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        <div className="tool-bar">
          {/* <code>UTILITY BAR GOES HERE</code> */}
          <h1>TODAY.me</h1>
        </div>
        <div className="main-container">
          <div className="actions"><code>ACTIONS HERE</code></div>
          <div className="main"><PostTypeSelector /></div>
          <div className="social"><FetchPost /></div>
        </div>
        <div className="footer"></div>
      </div>
    )
  }
}

class MainGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Grid className="">
       <Row className="tool-bar">
         <Col xs={12} md={12}><code>UTILITY BAR GOES HERE</code></Col>
       </Row>

       <Row className="main-container">
         <Col className="actions" xs={2} md={2}><code>ACTIONS HERE</code></Col>
         <Col className="main" xs={7} md={7}><code>MAIN CREATIVE CONTENT HERE</code><PostTypeSelector /></Col>
         <Col className="social" xs={3} md={3}><code>SOCIAL FEED HERE</code><br /><FetchPost /></Col>
       </Row>

       <Row className="footer">
         <Col xs={12} md={12}><code>FOOTER CONTENT GOES HERE</code></Col>
       </Row>
     </Grid>
    );
  }
}

class PostTypeSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Words"><Words /></Tab>
        <Tab eventKey={2} title="Image">Tab 2 content</Tab>
        <Tab eventKey={3} title="Sound">Tab 3 content</Tab>
      </Tabs>
    )
  }
}

class Words extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {value: 'Write something...'}
  }

  handleSubmit(e) {
    e.preventDefault();
    this.post()
    // this.post(this.refs.FormControl.getValue());
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  post() {
    console.log(this.state);
    let bodyValue = this.state.value
    request
      .post('http://localhost:3000/posts')
      .send({ title: 'test', body: bodyValue }) // sends a JSON post body
      .set('Accept', 'application/json')
      // .set('X-API-Key', 'foobar')
      // .set('accept', 'json')
      .end((err, res) => {
        console.log(err);
        console.log(res);
        // Calling the end function will send the request
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <textarea /*value={this.state.value}*/ onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class FetchPost extends Component {
  constructor(props) {
    super(props);
    this.state = {indexData: []};
    this.index = this.index.bind(this);
  }

  componentDidMount() {
    this.index();
  }

  index() {
    request
      .get('http://localhost:3000/posts.json')
      .end((err, res) => {
        this.setState({indexData: res.body});
      });
  }

  render() {
    var posts = this.state.indexData.map((post) =>
                    <span key={post.id}><pre>{JSON.stringify(post, null, 1) }</pre></span>
                  )

    return (
      <div>
        <div>{posts}</div>
      </div>
    )
  }
}
