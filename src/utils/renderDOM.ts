import Block from '../modules/block';

type positionType = 'before' | 'after';

export default function render(query: string, block: Block, position: positionType = 'after'): Element | null {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('No such root!');
  }
  switch (position) {
    case 'after':
      root.appendChild(block.getContent());
      break;

    case 'before':
      root.prepend(block.getContent());
      break;
    default:
      break;
  }

  return root;
}
