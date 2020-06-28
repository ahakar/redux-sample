
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import dc, { crossfilter } from 'dc';
import isEqual from 'lodash/isEqual';

export default class PieChart extends Component {

  static propTypes = {
    data: PropTypes.array
  };

  componentDidMount() {
    this.node = findDOMNode(this);
    this.chart = dc.pieChart(this.node);

    const legend = dc.legend().x(25).y(0).itemHeight(15).gap(5);
    this.chart
      .width(700).height(300)
      .legend(legend)
      .renderLabel(false)
      .innerRadius(50);

    this.updateData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if( !isEqual(nextProps.data, this.props.data) ) {
      this.updateData(nextProps.data);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.chart.resetSvg();
  }

  render() {
    return (<div className="chart" />);
  }

  updateData = (data) => {
    const dataset = crossfilter(data);
    const dimension = dataset.dimension(a => a.label);
    const group = dimension.group().reduceSum(a => a.count);

    this.chart
      .dimension(dimension)
      .group(group)
      .render();
  }
}
