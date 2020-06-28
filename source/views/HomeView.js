
import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default class HomeView extends Component {

  componentWillMount() {
    console.log('HOMEVIEW-COMPONENTWILLMOUNT');
    this.props.actions.getAllItems();
    //this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    console.log('COMPONENT WILL RECEIVE PROPS', nextProps, this.props);
  }

  render() {
     console.log('HomeView', this.props);
    const { home } = this.props;
    const { allItems } = home;

    return (
      <div className="view">
        <h3>List of items to buy</h3>

        <ol>
          {
            allItems.map((a, i) => (
              <ItemView key={i} item={a} onAddClick={this.onAddClick} />
            ))
          }
        </ol>

      </div>
    );
  }

  loadData = () => {
    this.props.actions.getAllItems();
    //this.props.actions.addMoreItems();
  }

  onAddClick = (item) => {
    this.props.actions.addToCart(item);
  }
}

class ItemView extends Component {
  render() {
    const { item } = this.props;
    return (
      <li>
        <strong>{item.name}</strong>
        <div>Price: Rs: {item.price} / kg</div>
        <button className="btn btn-sm btn-info"
          onClick={this.handleAddClick}>
          Add one item to Cart
        </button>
      </li>
    );
  }

  handleAddClick = () => {
    const { item, onAddClick } = this.props;
    onAddClick(item);
  }
}
