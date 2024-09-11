import * as React from "react";
import renderer from "react-test-renderer";
import Button from "../../Button";

it(`Carlist renders correctly`, () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});
