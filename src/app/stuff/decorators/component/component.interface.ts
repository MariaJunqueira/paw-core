export interface ComponentClass {
  appendScopedStyle: (scopedCssString: string, styleId: string) => void;
  styleId: string;
}
