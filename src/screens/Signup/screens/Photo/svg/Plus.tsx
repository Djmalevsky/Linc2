import * as React from "react";
import Svg, {
  SvgProps,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <Circle cx={16} cy={16} r={16} fill="#4AE6AD" />
      <Circle
        cx={16}
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
        d="M17.125 8.125a1.125 1.125 0 00-2.25 0v6.75h-6.75a1.125 1.125 0 000 2.25h6.75v6.75a1.125 1.125 0 002.25 0v-6.75h6.75a1.125 1.125 0 000-2.25h-6.75v-6.75z"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={2.065}
          x2={39.451}
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
