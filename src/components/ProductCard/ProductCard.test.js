import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Draggable from 'react-draggable';

import ProductCard from './index.js';

Enzyme.configure({adapter: new Adapter()});

describe('ProductCard', () => {
  let props;
  let mountedProductCard;

  const productCard = () => {
    if (!mountedProductCard) {
      mountedProductCard = shallow(<ProductCard {...props} />);
    }
    return mountedProductCard;
  }

  beforeEach(() => {
    props = {
      product: {
        name: 'Product Name',
        imageUrl: 'https://image',
        subcategories: [],
        brand: 'DevGrid'
      }
    };
  })

  it('always renders a Draggable Component', () => {
    const container = productCard().find(Draggable);
    expect(container.length).toBe(1);
  });

  it('always renders the product image', () => {
    const container = productCard().find('img');

    expect(container.props().src).toBe('https://image');
    expect(container.props().alt).toBe('Product Name');
  });

  it('always renders add the http protocol at an image that doesnt have it', () => {
    props.product.imageUrl = 'new_image';
    mountedProductCard = null

    const container = productCard().find('img');
    expect(container.props().src).toBe('http://new_image');
  });

  it('always renders the product name at the product title', () => {
    const container = productCard().find('h2');
    expect(container.text()).toBe('Product Name');
  });

  it('always renders the product brand', () => {
    const container = productCard().find('h4');
    expect(container.text()).toBe('DevGrid');
  });

  it('always call add dislike when click at the danger button', (done) => {
    props.addDislike = jest.fn();
    const spy = jest.spyOn(props, 'addDislike');
    mountedProductCard = null;

    const container = productCard();
    container.find('div.card-buttons button.danger').simulate('click');

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  it('always call add like when click at the success button', (done) => {
    props.addLike = jest.fn();
    const spy = jest.spyOn(props, 'addLike');
    mountedProductCard = null;

    const container = productCard();
    container.find('div.card-buttons button.success').simulate('click');

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
