declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  export const content: React.FC<SvgProps<SVGSVGElement>>;
  export default content;
}
