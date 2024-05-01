import mediaQuery from 'mediaQueries';
import styled from 'styled-components';

export const PublicGalleryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
  padding-top: 80px;
  margin-bottom: 40px;
  justify-content: space-evenly;
  gap: 10px;
  @media ${mediaQuery.mobile} {
    padding-top: 120px;
  }
`;

export const PublicGalleryProduct = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(240, 240, 240);
  padding: 5px;
  border-radius: 5px;
  gap: 5px;
  margin-bottom: 10px;
  width: unset;
  box-shadow: var(--box-shadow);
  @media ${mediaQuery.mobile} {
    width: fit-content;
  }
`;

export const PublicGalleryProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
`;

export const GalleryDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  font-size: 20px;
  color: var(--text-light);
  text-shadow: black 0.1em 0.1em 0.2em;
`;