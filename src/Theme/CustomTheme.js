import { getDesignTokens } from "./themePrimitives";
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
  chartsCustomizations,
  dataGridCustomizations,
  treeViewCustomizations,
} from "./Customizations";

export default function getCustomTheme(mode) {
  return {
    ...getDesignTokens("light"),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
      ...chartsCustomizations,
      ...dataGridCustomizations,
      ...treeViewCustomizations,
    },
  };
}
