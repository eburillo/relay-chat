import React from 'react';
import renderer from 'react-test-renderer';
import Entry from '../js/components/Entry/Entry';
import {InputText} from '../js/components/InputText';
import {ItemCounter} from '../js/components/ItemCounter';

describe('Render components', function() {
  it('renders an entry component', () => {
    const viewer = {
      'id': '99',
      'name': 'Test name',
      'avatar': 'test.png'
    }
    const entry = {
      "node": {
        "id": 99,
        "text": "Just a simple text to test",
        "date": 123123123
      }
    };

    let tree = renderer.create(
      <Entry viewer={viewer} key={entry.node.id} entry={entry.node}></Entry>
    );
    expect(tree).toMatchSnapshot();
  });

});
