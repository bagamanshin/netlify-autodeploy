import resourcesApi from '../../api/resources-api';

import { Block } from '../../modules';

import { IBlockProps } from '../../modules/Block/types';

interface IImageProps {
  imageData: null | string | Blob,
  imgClass?: string
}

const wrapClass = 'image-container';

export default class Image extends Block<HTMLDivElement, IImageProps> {
  constructor(props: IImageProps & Partial<IBlockProps>) {
    super('div', {
      ...props,
      className: props.className ? `${props.className} ${wrapClass}` : wrapClass
    });
  }

  render() {
    if (!this.props.imageData) {
      return '';
    }

    const createImageHTML = (blob: Blob) => {
      const imageObjectURL = URL.createObjectURL(blob);

      const image = document.createElement('img');
      image.src = imageObjectURL;

      if (this.props.imgClass) {
        image.classList.add(this.props.imgClass);
      }

      return image;
    };

    if (this.props.imageData instanceof Blob) {
      return createImageHTML(this.props.imageData);
    }

    return resourcesApi.request(this.props.imageData)
      .then(({ response }) => createImageHTML(response.response));
  }

  renderDOM() {}
}
