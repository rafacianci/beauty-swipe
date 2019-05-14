import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import ProductCard from '../../components/ProductCard';
import Header from '../../components/Header';
import { addLike } from '../../actions/product';

import './style.css';

class Products extends Component {
  state = {
    loading: true,
    products: [],
    totalPages: 0,
    checked: 0,
    currentPage: 0,
    itensOnPage: 0
  }

  componentDidMount() {
    this.getProducts(0)
  }

  addLike = product => {
    this.props.addLike(product);
    this.onRead()
  }

  onRead = () => {
    if (this.state.checked + 1 === this.state.itensOnPage) {
      this.getProducts(this.state.currentPage)
    }

    this.setState({
      checked: this.state.checked + 1
    });
  }

  getProducts = async page => {
    this.setState({
      loading: true
    });

    try {
      const { data } = await axios.get(`https://ycl641scac.execute-api.us-west-2.amazonaws.com/staging/products?page=${page}&hitsPerPage=20`);

      this.setState({
        loading: false,
        products: data.hits,
        totalPages: data.nbPages,
        currentPage: page + 1,
        itensOnPage: this.state.itensOnPage + data.hits.length
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: 'Error loading the products. Try again later.'
      });
    }
  }

  render() {
    const { likes } = this.props
    const { products, loading } = this.state

    return (
      <div className='container'>
        <Header likes={likes} />
        <div className='cards-list'>
          {products.map(product => (
            <ProductCard
              key={product.productId}
              addLike={this.addLike}
              addDislike={this.onRead}
              product={product}
            />
          ))}
          {loading && (
            <div className="loading-content">
              <div className="loading" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateProps = ({ product }) => ({
  likes: product.likes,
});

export default connect(mapStateProps, { addLike })(Products);
