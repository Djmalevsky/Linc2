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
      <Circle cx={16} cy={16} r={16} fill="#F30" />
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
        d="M22.707 10.707a1 1 0 00-1.414-1.414L16 14.586l-5.293-5.293a1 1 0 00-1.414 1.414L14.586 16l-5.293 5.293a1 1 0 101.414 1.414L16 17.414l5.293 5.293a1 1 0 001.414-1.414L17.414 16l5.293-5.293z"
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
          <Stop stopColor="#fff" stopOpacity={0} />
          <Stop offset={0.828} stopColor="#FFBA9C" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
