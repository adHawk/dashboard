import React, {useState} from "react";
var AWS = require('aws-sdk');

interface State {
  base64: string | undefined;
}

export class AWSMetrics extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      base64: undefined
    }
  }

  componentDidMount(){
      var metricWidget = {
        "metrics": [
            [ "AWS/EC2", "CPUUtilization", "InstanceId", "i-a6081333", { "stat": "Average", "id": "m0r0", "label": "Automation_Staging", "visible": false } ],
            [ "...", "i-067ef8d114f85ac8b", { "stat": "Average", "id": "m0r1", "label": "quora-scrape", "visible": false } ],
            [ "...", "i-023066bc0f84ecafe", { "stat": "Average", "id": "m0r2", "label": "nexus-production", "visible": false } ],
            [ "...", "i-035c7d47201dd3a29", { "stat": "Average", "id": "m0r3", "label": "Production" } ],
            [ "...", "i-0d88a4bf3eb6e023b", { "stat": "Average", "id": "m0r4", "label": "Staging" } ],
            [ "...", "i-0ad0f02aceb64c123", { "stat": "Average", "id": "m0r5", "label": "ads-staging", "visible": false } ],
            [ "...", "i-06672f18a1d097870", { "stat": "Average", "id": "m0r6", "label": "nexus-staging", "visible": false } ],
            [ "...", "i-01428ea8b60cd8611", { "stat": "Average", "id": "m0r7", "label": "ads-production", "visible": false } ],
            [ "...", "i-0ad4112dc40b06ed7", { "stat": "Average", "id": "m0r8", "label": "jenkins", "visible": false } ],
            [ "...", "i-0d294a0d37e63b60f", { "stat": "Average", "id": "m0r9", "label": "Automation_Production", "visible": false } ],
            [ "...", "i-019d5de2649d57a46", { "stat": "Average", "id": "m0r10", "label": "Automation_Dev", "visible": false } ],
            [ "...", "i-06dfe6071d1565fff", { "stat": "Average", "id": "m0r11", "label": "jenkins-windows-runner", "visible": false } ],
            [ "AWS/ElasticBeanstalk", "EnvironmentHealth", "EnvironmentName", "Production", { "stat": "Average", "visible": false } ],
            [ "...", "Staging", { "stat": "Average", "visible": false } ]
        ],
        "title": "CPU Utilization Average",
        "legend": {
            "position": "right"
        },
        "copilot": true,
        "view": "timeSeries",
        "stacked": false,
        "width": 1430,
        "height": 250,
        "start": "-PT3H",
        "end": "P0D"
    }

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAXIPEH3LBXVKMWW6U";
    AWS.config.secretAccessKey = "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";
    AWS.config.region = "us-west-2";

    var cw = new AWS.CloudWatch();

    var params = {
        MetricWidget: JSON.stringify(metricWidget),
        
      };

    cw.getMetricWidgetImage(params, (err: any, data: any) => {
      debugger
      if (err) {
          console.log(err, err.stack); // an error occurred
      }
      else{
        const base64 = this.arrayBufferToBase64(data.MetricWidgetImage);
        console.log(base64);
        this.setState({
          base64
        });
      }        
    });

      
  }

  arrayBufferToBase64( bytes: Uint8Array ) {
    var binary = '';
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
  render() {
      return (
        <img src={`data:image/png;base64, ${this.state.base64}`} />
      );
  }
};
