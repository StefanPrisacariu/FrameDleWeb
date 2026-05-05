export type Styles = {
  'fd_gr_0': string;
  'fd_gr_0_box': string;
  'fd_gr_0_multiple': string;
  'fd_gr_0_text': string;
  'fd_gr_colors_correct': string;
  'fd_gr_colors_incorrect': string;
  'fd_gr_colors_partial': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
