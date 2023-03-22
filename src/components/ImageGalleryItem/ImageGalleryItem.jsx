import { Component } from 'react';
import Modal from '../Modal/Modal';
import { ItemGallery, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { imageURL, imageModalURL, description } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <ItemGallery onClick={this.openModal}>
          <Img src={imageURL} alt={description} />
        </ItemGallery>
        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            <Img src={imageModalURL} alt={description} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageModalURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
