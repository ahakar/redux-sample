
import React, { Component, PropTypes } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

export default class CartView extends Component {

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps of CART', nextProps, this.props);
  }

  render() {
    console.log('CartView', this.props);
    const { cart, actions } = this.props;
    const { cartItems } = cart;

    return (
      <div className="view">
        <h3>Verify and Check out</h3>

        <ol>
          {
            cartItems.map((a, i) => (
              <CartItemView key={i}
                item={a}
                onRemoveClick={this.onRemoveClick}
              />
            ))
          }
        </ol>

        <hr />
        <Button bsStyle="primary" onClick={actions.checkOut}
          disabled={!cartItems.length}>
          Check Out
        </Button>

      </div>
    );
  }

  onRemoveClick = (item) => {
    this.props.actions.removeFromCart(item);
  }
}

class CartItemView extends Component {
  render() {
    const { item } = this.props;
    return (
      <li>
        <strong>{item.name}</strong>
        <div>Price: Rs: {item.price} / kg</div>
        <div>Count: {item.count}</div>
        <Button bsStyle="warning"
          onClick={this.handleRemoveClick}>
          Remove this item
        </Button>
      </li>
    );
  }

  handleRemoveClick = () => {
    const { item, onRemoveClick } = this.props;
    onRemoveClick(item);
  }
}
