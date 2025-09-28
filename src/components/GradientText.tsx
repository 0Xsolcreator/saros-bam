import { StyleSheet } from "react-native"
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from "react-native-svg"

interface GradientTextProps {
  text: string
  fontSize?: number
  fontWeight?: string
  width?: number | string
  height?: number | string
}

export default function GradientText({
  text,
  fontSize = 46,
  fontWeight,
  width = "100%",
  height = "100%",
}: GradientTextProps) {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <LinearGradient
          id="liquidityGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientTransform="rotate(8.54)"
        >
          <Stop offset="2.83%" stopColor="#94641E" />
          <Stop offset="28.29%" stopColor="#F3C468" />
          <Stop offset="35.41%" stopColor="#FFF2DB" />
          <Stop offset="41.9%" stopColor="#EAC885" />
          <Stop offset="67.42%" stopColor="#ECD8A3" />
          <Stop offset="70.73%" stopColor="#FBF5D1" />
          <Stop offset="75.08%" stopColor="#BD9A4B" />
        </LinearGradient>
      </Defs>

      <SvgText
        fill="url(#liquidityGradient)"
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily="plusJakartaSansBold"
        textAnchor="start"
        x="0"
        y={fontSize * 0.8}
      >
        {text}
      </SvgText>
    </Svg>
  )
}
