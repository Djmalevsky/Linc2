import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={148}
      height={148}
      fill="none"
      viewBox="0 0 148 148"
      {...props}
    >
      <G filter="url(#prefix__filter0_d)">
        <Path
          fill="#EEEEE9"
          stroke="#A8A8A4"
          strokeWidth={3}
          d="M8.5 38C8.5 21.155 22.155 7.5 39 7.5h64c16.845 0 30.5 13.655 30.5 30.5v64c0 16.845-13.655 30.5-30.5 30.5H39c-16.845 0-30.5-13.655-30.5-30.5V38z"
        />
        <Circle cx={125} cy={16} r={16} fill="#4AE6AD" />
        <Circle
          cx={125}
          cy={16}
          r={16}
          fill="url(#prefix__paint0_linear)"
          fillOpacity={0.55}
        />
        <Path
          fill="#F8F8F4"
          stroke="#F8F8F4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M126.125 8.125a1.125 1.125 0 00-2.25 0v6.75h-6.75a1.125 1.125 0 000 2.25h6.75v6.75a1.125 1.125 0 002.25 0v-6.75h6.75a1.125 1.125 0 000-2.25h-6.75v-6.75z"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={111.065}
          x2={148.451}
          y1={-12}
          y2={-8.959}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.136} stopColor="#2A9FA8" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
