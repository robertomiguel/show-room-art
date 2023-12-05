import styled from 'styled-components';

export const PublicGalleryContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px;
  padding-top: ${({ $isMobile }) => ($isMobile ? '120px' : '80px')};
  margin-bottom: 40px;
  justify-content: space-evenly;
  gap: 10px;
`;

export const PublicGalleryProduct = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  background: rgb(240, 240, 240);
  padding: 5px;
  border-radius: 5px;
  gap: 5px;
  margin-bottom: 10px;
  width: ${({ $isMobile }) => ($isMobile ? 'fit-content' : 'unset')};
  box-shadow: var(--box-shadow);
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