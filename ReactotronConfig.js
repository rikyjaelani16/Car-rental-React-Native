import { reactotronRedux } from "reactotron-redux";
import Reactotron from "reactotron-react-native";

const reactotron = Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins\
  .use(reactotronRedux())
  .connect(); // let's connect!

export default reactotron;
