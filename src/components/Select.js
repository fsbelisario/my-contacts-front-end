import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  background: #FFF;
  border: 2px solid #FFF;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }
`;
