import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CategoriesFilter from './index.js';

Enzyme.configure({adapter: new Adapter()});

describe('Categories Filter', () => {
  let props;
  let mountedCategoriesFilter;

  const categoriesFilter = () => {
    if (!mountedCategoriesFilter) {
      mountedCategoriesFilter = shallow(<CategoriesFilter {...props} />);
    }
    return mountedCategoriesFilter;
  }

  beforeEach(() => {
    props = {
      onChange: jest.fn()
    };
  })

  it('always renders a category container', () => {
    const container = categoriesFilter().find('div.category-container');
    expect(container.length).toBe(1);
  });

  it('always renders title to represent the button content', () => {
    const container = categoriesFilter().find('h6');
    expect(container.text()).toBe('Filter by category');
  });

  it('always renders the buttons container', () => {
    const container = categoriesFilter().find('div.category-actions');
    expect(container.length).toBe(1);
  });

  it('always renders the buttons for each category', () => {
    const container = categoriesFilter().find('div.category-actions button');
    expect(container.length).toBe(5);
  });

  it('always have an active class at the active button', () => {
    props.category = 'eyeshadow';
    mountedCategoriesFilter = null;

    const container = categoriesFilter().find('div.category-actions button').first().hasClass('active');

    expect(container).toBe(true);
  });

  it('always call on change when click at one button', (done) => {
    const spy = jest.spyOn(props, 'onChange');
    mountedCategoriesFilter = null;

    const container = categoriesFilter();
    container.find('div.category-actions button').first().simulate('click');

    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    })
  });
});
