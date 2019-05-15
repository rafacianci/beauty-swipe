import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Draggable from 'react-draggable';

import './style.css';

class Card extends PureComponent {
  state = {
    liked: null
  }

  handleStop = (event, { x }) => {
    if (x > 10) {
      this.props.addLike(this.props.product);
      return this.setState({
        liked: true
      });
    }

    if (x < -10) {
      this.props.addDislike(this.props.product);
      return this.setState({
        liked: false
      });
    }

    this.setState({
      liked: null
    });
  }

  like = () => {
    this.setState({ liked: true });
    this.props.addLike(this.props.product);
  }

  dislike = () => {
    this.setState({ liked: false });
    this.props.addDislike(this.props.product);
  }

  render() {
    const { liked } = this.state;
    const { product: { name, subcategories, imageUrl, brand }} = this.props;

    return (
      <Draggable
        position={{ x: liked === true ? 2400 : liked === false ? -2400 : 0, y: liked !== null ? 1200 : 0}}
        onStop={this.handleStop}
      >
        <div className="draggable">
          <div className="card">
            <div className="card-image">
              <img
                src={imageUrl.includes('http') ? imageUrl : `http://${imageUrl}`}
                alt={name}
              />
            </div>

            <div className="card-info">
              <h2>{name}</h2>
              <h4>{brand}</h4>
              <p>
                {subcategories.map((category, index) => (
                  <span key={index}>{category}</span>
                ))}
              </p>
            </div>
            <div className="card-buttons">
              <button className="danger" onClick={this.dislike}>
                Dislike
              </button>
              <button className="success" onClick={this.like}>
                Like
              </button>
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  distance: PropTypes.number,
  text: PropTypes.string,
  pics: PropTypes.array
};

export default Card;
