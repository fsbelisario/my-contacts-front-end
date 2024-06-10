import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');

    container.setAttribute('id', 'loader-root');

    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    container,
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
