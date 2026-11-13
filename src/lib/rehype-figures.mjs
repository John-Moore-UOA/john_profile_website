// Turns paragraph-wrapped images into <figure>s with captions (from the title).
// Images pointing at /placeholder.svg become visible "image slots" showing the alt text,
// so John can see exactly which screenshot/diagram is still owed.
export function rehypeFigures() {
  return (tree) => walk(tree);
}
function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'element' && child.tagName === 'p') {
      const kids = child.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (kids.length === 1 && kids[0].tagName === 'img') return toFigure(kids[0]);
    }
    walk(child);
    return child;
  });
}
const text = (value) => ({ type: 'text', value });
const el = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });
function toFigure(img) {
  const { src = '', alt = '', title } = img.properties;
  const caption = title ? [el('figcaption', {}, [text(title)])] : [];
  if (String(src).endsWith('placeholder.svg')) {
    const brief = String(alt).replace(/^PLACEHOLDER:\s*/i, '');
    return el('figure', { className: ['fig', 'fig-slot'] }, [
      el('div', { className: ['slot'], role: 'img', ariaLabel: `Image to come: ${brief}` }, [
        el('span', { className: ['slot-tag'] }, [text('Image to come')]),
        el('p', {}, [text(brief)]),
      ]),
      ...caption,
    ]);
  }
  delete img.properties.title;
  img.properties.loading = 'lazy';
  return el('figure', { className: ['fig'] }, [img, ...caption]);
}
