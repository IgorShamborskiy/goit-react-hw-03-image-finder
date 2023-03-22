import { RotatingLines } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

const Loader = () => (
  <LoaderWrap>
    <RotatingLines
      strokeColor="rgba(4, 16, 214, 0.76)"
      strokeWidth="4"
      animationDuration="3"
      width="80"
      visible={true}
    />
  </LoaderWrap>
);

export default Loader;
