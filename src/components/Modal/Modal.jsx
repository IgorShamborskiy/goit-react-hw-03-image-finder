import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContent, ModalOverlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }

  closeModalByEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeModalByBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.closeModalByBackdrop}>
        <ModalContent>{this.props.children}</ModalContent>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
