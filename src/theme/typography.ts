const FONT_PRIMARY = "Lato, sans-serif";

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: 40,
    letterSpacing: 2,
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: 32,
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: 24,
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: 22,
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: 18,
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: 17,
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: 16,
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: 14,
  },
  body1: {
    lineHeight: 1.5,
    fontSize: 16,
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: 14,
  },
  caption: {
    lineHeight: 1.5,
    fontSize: 12,
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: 12,
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: 14,
    textTransform: "capitalize",
  },
} as const;

export default typography;
