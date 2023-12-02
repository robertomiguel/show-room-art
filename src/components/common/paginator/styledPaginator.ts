import styled from 'styled-components';

export const StyledPaginator = styled.div<{$isMobile: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '350px')};
`;

export const StyledPagSelect = styled.select`
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-radius: 0;
    margin: 0;
    padding-top: 6px;
    padding-bottom: 8.5px;

`;

export const ButtonPaginator = styled.button`
  border: none;
  border-radius: 0;
  align-items: center;
  height: 38px;
`;
