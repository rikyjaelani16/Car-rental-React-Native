import { render } from "@testing-library/react-native";
import Login from "../index";

describe("<login/>", () => {
  test("Login render correctly", () => {
    const { getByText } = render(<Login />);

    getByText("Welcome Back!");
  });
});
