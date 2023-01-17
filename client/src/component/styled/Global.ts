// globalStyles.js
import { createGlobalStyle, DefaultTheme } from 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    backgroundShadow: string;
    colorUIBase: string;
    secondBackground: string;
    threeBackground: string;
    backgroundInput: string;
    color: string;
    colorUITwo: string;
    buttonColor: string;
    errorColor: string;
    link: string;
    height: number;
    text: string;
    buttonHover: string;
    borderRadius: string;
    transition: string;
    disable: string;
  }
}
const Global = createGlobalStyle<{ theme: DefaultTheme }>`

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.background};
    
  }

  * {
    transition: all 0.5s;

  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  :root {
    /* Typography */
    --family: 'Nunito Sans', sans-serif;
    --fs-sm: 14px;
    --fs-md: 16px;
    --fw-light: 300;
    --fw-normal: 600;
    --fw-bold: 800;

    /* Other */
    --raddi: 0.5rem
  }

  &::-webkit-scrollbar {
    width: 0.7rem;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.secondBackground};
  }
  
  ::-webkit-scrollbar-thumb {
    background:  ${(props) => props.theme.threeBackground};;
    //border-radius: 10px;
    //border: 3px solid ${(props) => props.theme.secondBackground};;
  }
`;

export default Global;
