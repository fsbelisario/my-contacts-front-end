import styled from 'styled-components';

export const Container = styled.header`
  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      transform: rotate(-90deg);
      margin-right: 8px;
    }

    h1 {
      font-size: 24px;
    }
  }
`;
