import assert from 'assert';

import 'jsdom-global/register';

import Button from './button';

describe('Button component:', () => {
  it('should contain text', () => {
    const textButton = 'This is some text';
    const button = new Button({ text: textButton });
    assert.equal(button.element.textContent, textButton);
  });

  it('should handle click', () => {
    let clickFlag = false;

    const button = new Button({
      events: {
        click: () => {
          clickFlag = true;
        }
      }
    });

    button.element.click();

    assert.equal(clickFlag, true);
  });

  it('shouldn\'t handle click', () => {
    let clickFlag = false;

    const button = new Button({
      disabled: true,
      events: {
        click: () => {
          clickFlag = true;
        }
      }
    });

    button.element.click();

    assert.equal(clickFlag, false);
  });
});
