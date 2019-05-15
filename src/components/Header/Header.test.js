import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './index.js';

Enzyme.configure({adapter: new Adapter()});

describe('Header', () => {
  let props;
  let mountedHeader;

  const header = () => {
    if (!mountedHeader) {
      mountedHeader = shallow(<Header {...props} />);
    }
    return mountedHeader;
  }

  beforeEach(() => {
    props = {
      likes: 0,
      dislikes: 0
    };
  })

  it('always renders a header', () => {
    const container = header().find('header');
    expect(container.length).toBe(1);
  });

  it('always renders the page title', () => {
    const container = header().find('h1');
    expect(container.text()).toBe('Beauty Swipe');
  });

  it('always renders the likes container', () => {
    const container = header().find('div.likes-container');
    expect(container.length).toBe(1);
  });

  it('always renders a container for each category', () => {
    const headerContent = header();

    const likeContainer = headerContent.find('div.like-container');
    const dislikeContainer = headerContent.find('div.dislike-container');

    expect(likeContainer.length).toBe(1);
    expect(dislikeContainer.length).toBe(1);
  });

  it('always render the right value of the likes counter', () => {
    props.likes = 99;
    mountedHeader = null;

    const container = header().find('div.like-container span').last().text();

    expect(container).toBe('99');
  });

  it('always render the right value of the dislikes counter', () => {
    props.dislikes = 87;
    mountedHeader = null;

    const container = header().find('div.dislike-container span').last().text();

    expect(container).toBe('87');
  });
});
