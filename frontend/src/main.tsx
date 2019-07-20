import React from "react";
import ReactDOM from "react-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { AWSMetrics } from "./aws/index";
import { GCPMetrics } from './gcp/index';

import "./style.scss";

var classnames = require("classnames");

interface State {
  activeTab: string;
}

class App extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      activeTab: "1",
    };
  }

  toggle = (tab: string) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              FlooringStores
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              SlingShot
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <GCPMetrics />
          </TabPane>
          <TabPane tabId="2">
            <AWSMetrics />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
