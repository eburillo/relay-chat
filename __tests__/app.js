import React from 'react';
import Relay from 'react-relay';
import renderer from 'react-test-renderer';
import App from '../js/components/App';
import AppHomeRoute from '../js/routes/AppHomeRoute';

describe('Render App', function() {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <Relay.Renderer
        environment={Relay.Store}
        Container={App}
        queryConfig={new AppHomeRoute()}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
