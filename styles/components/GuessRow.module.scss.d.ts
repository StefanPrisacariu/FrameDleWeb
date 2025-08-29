export type Styles = {
  'fd_gr_0': string;
  'fd_gr_0_box': string;
  'fd_gr_0_multiple': string;
  'fd_gr_0_text': string;
  'fd_gr_colors_acro_correct': string;
  'fd_gr_colors_acro_incorrect': string;
  'fd_gr_colors_acro_partial': string;
  'fd_gr_colors_deu_correct': string;
  'fd_gr_colors_deu_incorrect': string;
  'fd_gr_colors_deu_partial': string;
  'fd_gr_colors_pro_correct': string;
  'fd_gr_colors_pro_incorrect': string;
  'fd_gr_colors_pro_partial': string;
  'fd_gr_colors_std_correct': string;
  'fd_gr_colors_std_incorrect': string;
  'fd_gr_colors_std_partial': string;
  'fd_gr_colors_tri_correct': string;
  'fd_gr_colors_tri_incorrect': string;
  'fd_gr_colors_tri_partial': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
