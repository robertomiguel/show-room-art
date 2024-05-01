import mediaQuery from 'mediaQueries';
import styled from 'styled-components';

export const StyledPaginator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 350px;
  @media ${mediaQuery.mobile} {
    width: 100%;
  }
`;

export const StyledPagSelect = styled.select`
    font-size: 1.2rem;
    letter-spacing: 1px;
    margin: 0;
    padding-top: 6px;
    padding-bottom: 8.5px;
`;

export const ButtonPaginator = styled.button`
  display: flex;
  justify-content: center;
  border: none;
  border-radius: 50%;
  align-items: center;
  width: 38px;
  height: 38px;
  align-items: center;  
`;
