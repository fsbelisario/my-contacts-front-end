import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import ReactPortal from '../ReactPortal';

import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay
        ref={animatedElementRef}
        isLeaving={!isLoading}
      >
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
