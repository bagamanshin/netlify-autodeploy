import Block from './block';

export default function render(query: string, block: Block): Element | null {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error('No such root!');
  }

  root.appendChild(block.getContent());
  return root;
}
