import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="prefix__feather prefix__feather-briefcase"
      {...props}
    >
      <Rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
      <Path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </Svg>
  );
}

export default SvgComponent;
