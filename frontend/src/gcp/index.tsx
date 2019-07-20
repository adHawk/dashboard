import React from "react";
import "./style.scss";

interface State {
  timeframe: string | null;
}

export class GCPMetrics extends React.Component<{}, State> {
  timeframes: { key: string; value: string }[] = [
    {
      key: "1h",
      value: "One Hour"
    },
    {
      key: "6h",
      value: "Six Hours"
    },
    {
      key: "1d",
      value: "One Day"
    },
    {
      key: "1w",
      value: "One Week"
    },
    {
      key: "1M",
      value: "One Month"
    },
    {
      key: "6w",
      value: "Six Weeks"
    }
  ];

  constructor(props: {}) {
    super(props);

    this.state = {
      timeframe: "1h"
    };
  }

  handleTimeframeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      timeframe: event.currentTarget.value
    });
  };

  srcForChart = (id: string) => {
    return `https://public.google.stackdriver.com/public/chart/${id}?drawMode=color&showLegend=true&theme=light&autoRefresh=true&timeframe=${
      this.state.timeframe
    }`;
  };

  render() {
    return (
      <div>
        <div className="text-right mt-3 mr-5">
          <select onChange={this.handleTimeframeChange}>
            {this.timeframes.map(
              (timeframe: { key: string; value: string }) => (
                <option value={timeframe.key} key={timeframe.key}>
                  {timeframe.value}
                </option>
              )
            )}
            ;
          </select>
        </div>
        <div className="row">
          <div className="col-6">
            <iframe
              className="p-5 border-0"
              src={this.srcForChart("3825643149546100198")}
              width="100%"
              height="400"
              scrolling="no"
              seamless={true}
            />
          </div>
          <div className="col-6">
            <iframe
              className="p-5 border-0"
              src={this.srcForChart("3825643149546099295")}
              width="100%"
              height="400"
              scrolling="no"
              seamless={true}
            />
          </div>
          <div className="col-6">
            <iframe
              className="p-5 border-0"
              src={this.srcForChart("16339011581550173096")}
              width="100%"
              height="400"
              scrolling="no"
              seamless={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
