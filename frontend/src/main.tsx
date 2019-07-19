import React, {useState} from "react";
import ReactDOM from "react-dom";
import { TabContent, TabPane, Card, Button, CardTitle, CardText, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
var classnames = require('classnames');

import "./style.scss";

interface State {
  activeTab: string;
  timeframe: string | null;
}

class App extends React.Component<{}, State> {
  timeframes: {key: string; value: string}[] = [
    {
      key: '1h',
      value: 'One Hour'
    },
    {
      key: '6h',
      value: 'Six Hours'
    },
    {
      key: '1d',
      value: 'One Day'
    },
    {
      key: '1w',
      value: 'One Week'
    },
    {
      key: '1M',
      value: 'One Month'
    },
    {
      key: '6w',
      value: 'Six Weeks'
    }
  ];

  constructor(props: {}) {
    super(props);

    this.state = {
      activeTab: '1',
      timeframe: '1h'
    }
  }

  toggle = (tab: string) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleTimeframeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      timeframe: event.currentTarget.value
    });
  }

  srcForChart = (id: string) => {
    return `https://public.google.stackdriver.com/public/chart/${id}?drawMode=color&showLegend=true&theme=light&autoRefresh=true&timeframe=${this.state.timeframe}`
  }

  render() {
    return (
      <div className="App">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              FlooringStores
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              SlingShot
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        <div className="text-right mt-3 mr-5">
          <select onChange={this.handleTimeframeChange}>
            {this.timeframes.map((timeframe: {key: string; value: string}) =>
              <option value={timeframe.key} key={timeframe.key}>{timeframe.value}</option>
            )};
          </select>
        </div>
          <div className="row">
              <div className="col-6">
                <iframe className="p-5 border-0" src={this.srcForChart("3825643149546100198")} width="100%" height="400" scrolling="no" seamless={true}></iframe>
              </div>
              <div className="col-6">
                <iframe className="p-5 border-0" src={this.srcForChart("3825643149546099295")} width="100%" height="400" scrolling="no" seamless={true}></iframe>
              </div>
              <div className="col-6">
                <iframe className="p-5 border-0" src={this.srcForChart("16339011581550173096")} width="100%" height="400" scrolling="no" seamless={true}></iframe>
              </div>
            </div>
        </TabPane>
        <TabPane tabId="2">

        </TabPane>
      </TabContent>
      </div>
  )
  }
};

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
