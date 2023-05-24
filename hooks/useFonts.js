import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    psbolditalic: require("../assets/fonts/psbolditalic.ttf"),
    psbold: require("../assets/fonts/psbold.ttf"),
    psitalic: require("../assets/fonts/psitalic.ttf"),
    psregular: require("../assets/fonts/psregular.ttf"),
  });
