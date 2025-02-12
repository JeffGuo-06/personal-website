import { createTheme, MantineTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '900',
  },
  components: {
    Title: {
      styles: (theme: MantineTheme) => ({
        root: {
          color: theme.colors.gray[0],
        },
    }),
    },
  },
});
