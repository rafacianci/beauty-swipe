import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import CategoriesFilter from '../../components/CategoriesFilter';

import {
  addLike,
  addDislike,
  getProducts,
  changeCategory
} from '../../actions/product';

import './style.css';

class Products extends Component {
  state = {
    checked: 0
  }

  componentDidMount() {
    this.props.getProducts(0);
  }

  addLike = product => {
    this.props.addLike(product);
    this.onRead();
  }

  addDislike = product => {
    this.props.addDislike(product);
    this.onRead();
  }

  onRead = () => {
    if (this.state.checked + 1 === this.props.products.itensOnPage) {
      this.props.getProducts(this.props.products.currentPage + 1, this.props.category);
    }

    this.setState({
      checked: this.state.checked + 1
    });
  }

  changeCategory = category => {
    this.props.changeCategory(category);
    this.props.getProducts(0, category === this.props.category ? null : category);
  }

  render() {
    const { likes, dislikes, category, products: { data, loading }} = this.props;

    return (
      <div className='container'>
        <Header likes={likes} dislikes={dislikes} />
        <div className='cards-list'>
          {data.map(product => (
            <ProductCard
              key={product.productId}
              addLike={this.addLike}
              addDislike={this.addDislike}
              product={product}
            />
          ))}
          {loading && (
            <div className="loading-content">
              <div className="loading" />
            </div>
          )}
        </div>
        <CategoriesFilter
          category={category}
          onChange={this.changeCategory}
        />
      </div>
    );
  }
}

const mapStateProps = ({ product }) => ({
  likes: product.likes,
  dislikes: product.dislikes,
  products: product.products,
  category: product.category
});

export default connect(mapStateProps, {
  addLike,
  addDislike,
  getProducts,
  changeCategory
})(Products);
