import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { UI_WHITE } from "../../../../../../colors";

function SvgComponent(props: SvgProps) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 594" {...props}>
      <Path
        d="M375 48v546H0V48A48 48 0 0148 0h38.26a48 48 0 0143.27 27.19c.09.19.19.39.28.59a64 64 0 00115.38 0c.09-.2.19-.4.28-.59A48 48 0 01288.74 0H327a48 48 0 0148 48z"
        fill={UI_WHITE}
        data-name="Layer 2"
      />
    </Svg>
  );
}

export default SvgComponent;
