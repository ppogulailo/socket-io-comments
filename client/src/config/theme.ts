import { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
    background: '#cdd8ff',
    backgroundShadow: 'rgba(149, 157, 165, 0.2) 0 8px 24px',
    colorUIBase: '#f4f5f6',
    secondBackground: '#ffffff',
    threeBackground: 'rgba(0, 0, 252, 0.2)',
    backgroundInput: '#cacfd5',
    color: 'hsl(200,15%,8%)',
    colorUITwo: '#95abff',
    buttonColor: '#7ba5ff',
    buttonHover: 'hsl(203,86%,53%)',
    errorColor: 'hsl(349,52%,61%)',
    link: 'hsl(226,100%,83%)',
    height: window.innerHeight,
    text: '#0b1016',
    borderRadius: '15px',
    transition: '.5s',
    disable: 'hsl(208,24%,68%)',
};
export const dark: DefaultTheme = {
    background: '#262525',
    colorUIBase: '#3b6da1',
    backgroundShadow: 'rgba(149, 157, 165, 0.2) 0 8px 24px',
    secondBackground: 'hsl(0,0%,18%)',
    // Inputs
    text: 'hsl(140,42%,35%)',
    backgroundInput: '#262525',
    threeBackground: 'hsl(120,13%,28%)',
    color: '#0b1016',
    colorUITwo: 'hsl(0,0%,18%)',
    buttonColor: 'hsl(140,42%,35%)',
    buttonHover: 'hsl(140,61%,29%)',
    errorColor: 'hsl(349,52%,61%)',
    link: 'hsl(226,100%,83%)',
    height: window.innerHeight,
    borderRadius: '15px',
    transition: '.5s',
    disable: 'hsl(120,13%,28%)',
};
