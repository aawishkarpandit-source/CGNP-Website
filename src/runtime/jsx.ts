/**
 * VELTRION — minimal JSX runtime (NO React).
 * Usage in .tsx files:
 *   /** @jsx h *\/
 *   import { h, Fragment } from "../runtime/jsx";
 *   const el = <div class="card">Hello</div>;
 */

export type Props = Record<string, any> & { children?: any[] };
export type VNode = { tag: string | Function; props: Props };

export function Fragment(props: Props): any {
  return props.children ?? [];
}

// --- SVG support -------------------------------------------------------
// document.createElement("svg") produces an HTML-namespace element that
// browsers do NOT render; SVG content must be created with createElementNS.
const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_TAGS: Record<string, true> = {
  svg: true, path: true, g: true, circle: true, rect: true, line: true,
  polyline: true, polygon: true, ellipse: true, text: true, tspan: true,
  defs: true, use: true, mask: true, clipPath: true, linearGradient: true,
  radialGradient: true, stop: true,
};

function createEl(tag: string): Element {
  return SVG_TAGS[tag]
    ? document.createElementNS(SVG_NS, tag)
    : document.createElement(tag);
}

function setAttr(el: Element, key: string, value: any): void {
  if (value == null || value === false) return;
  if (key === "class" || key === "className") { el.setAttribute("class", String(value)); return; }
  if (key === "htmlFor") { el.setAttribute("for", String(value)); return; }
  if (key.startsWith("on") && typeof value === "function") {
    const evt = key.slice(2).toLowerCase();
    el.addEventListener(evt, value as EventListener);
    return;
  }
  if (key === "style" && typeof value === "object") {
    Object.assign((el as HTMLElement).style, value);
    return;
  }
  if (value === true) { el.setAttribute(key, ""); return; }
  el.setAttribute(key, String(value));
}

export function h(tag: string | Function, props?: Props, ...children: any[]): HTMLElement | DocumentFragment | any {
  const flat: any[] = ([] as any[]).concat(...(children || [])).flat(9).filter((c) => c != null && c !== false);
  if (typeof tag === "function") {
    return (tag as Function)({ ...(props || {}), children: flat });
  }
  if (tag === "fragment" || (tag as any) === Fragment) {
    const frag = document.createDocumentFragment();
    flat.forEach((c) => frag.append(c instanceof Node ? c : document.createTextNode(String(c))));
    return frag;
  }
  const el = createEl(tag as string);
  const p = props || {};
  Object.keys(p).forEach((k) => { if (k !== "children") setAttr(el, k, p[k]); });
  // allow children passed via props.children too
  const extra = (p as any).children;
  const all = extra ? ([] as any[]).concat(flat, extra).flat(9) : flat;
  all.forEach((c) => {
    if (c instanceof Node) el.appendChild(c);
    else if (Array.isArray(c)) c.forEach((x) => el.append(x instanceof Node ? x : document.createTextNode(String(x))));
    else el.appendChild(document.createTextNode(String(c)));
  });
  return el;
}

export function render(node: Node | Node[], mount: Element | null): void {
  if (!mount) return;
  mount.innerHTML = "";
  if (Array.isArray(node)) node.forEach((n) => mount.append(n instanceof Node ? n : document.createTextNode(String(n))));
  else mount.append(node instanceof Node ? node : document.createTextNode(String(node)));
}

export function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" } as any)[c]);
}
