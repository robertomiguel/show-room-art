import styled from 'styled-components';

export const PrivateGalleryContainer = styled.div<{$isMobile: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 8px;
  margin-bottom: 40px;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  margin-top: ${({ $isMobile }) => ($isMobile ? '250px' : '150px')};
`;

export const PrivateImageBox = styled.div<{$isSelected: boolean}>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap: 5px;
  width: fit-content;
  outline: ${({ $isSelected }) => ($isSelected ? '1px solid white' : 'unset')};
  `;

export const PrivateProductInfo = styled.div<{$isPublic: boolean}>`
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  padding: 0;
  width: 100%;
  background-color: ${({ $isPublic }) => ($isPublic ? 'var(--background-blue)' : 'var(--background-darker)')};
`;

export const FormFieldRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 45px;
`;

export const ModalImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`;