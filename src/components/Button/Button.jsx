import { Component } from 'react';
import { Button } from './Button.styled';
import PropTypes from 'prop-types';

export default class ButtonLoadMore extends Component {
  state = {
    showButton: false,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ showButton: true });
    }, 200);
  }

  render() {
    return (
      <Button
        type="button"
        style={{ display: !this.state.showButton ? 'none' : 'block' }}
        onClick={this.props.funcLoadMore}
      >
        Load more
      </Button>
    );
  }
}

ButtonLoadMore.propTypes = {
  funcLoadMore: PropTypes.func.isRequired,
};
