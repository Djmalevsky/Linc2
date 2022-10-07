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
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <Circle cx={8} cy={8} r={8} fill="#4AE6AD" />
      <Circle
        cx={8}
        cy={8}
        r={8}
        fill="url(#prefix__paint0_linear)"
        fillOpacity={0.55}
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5l-5.5 5.5L4 8"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={1.032}
          x2={19.726}
          y1={-6}
          y2={-4.479}
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
