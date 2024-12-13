declare module 'alpinejs' {

  export function morph(
    el: Element,
    newHtml: string,
    options?: {
      updating?: (el: Element, toEl: Element, childrenOnly: () => void, skip: () => void) => void;
      updated?: (el: Element, toEl: Element) => void;
      removing?: (el: Element, skip: () => void) => void;
      removed?: (el: Element) => void;
      adding?: (el: Element, skip: () => void) => void;
      added?: (el: Element) => void;
      key?: (el: Element) => any;
      lookahead?: boolean;
    },
  ): void;

  export function plugin(morph: any) {
    throw new Error("Function not implemented.");
  }
}