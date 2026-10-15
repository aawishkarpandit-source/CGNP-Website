/**
 * Global JSX namespace for the minimal `h()` runtime (NO React).
 * tsconfig: jsx=react, jsxFactory=h, jsxFragmentFactory=Fragment.
 * This file zeroes the TS7026 baseline (JSX.IntrinsicElements missing).
 */
declare global {
  namespace JSX {
    /** Anything `h()` can build: HTML/SVG element, DocumentFragment, array. */
    type Element = any;
    /** Children are passed on the `children` prop for value-based components. */
    interface ElementChildrenAttribute {
      children: {};
    }
    /** Common attributes accepted on any element/component (e.g. `key`). */
    interface IntrinsicAttributes {
      key?: string | number;
    }
    /** All intrinsic elements accepted; the runtime builds them via h(). */
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
