import styled from 'styled-components';

export const MenuControlContainer = styled.div`
  z-index: 3;
  overflow-y: scroll;
  padding: 10px;
  width: 360px;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: var(--background-darker);
  left: 0;
  top: 0;
  bottom: 0;
  box-shadow: var(--box-shadow);
`;

export const MenuControlBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GalleryControlContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  position: sticky;
  z-index: 1;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  background: var(--background-darker);
  padding: 10px;
  box-shadow: var(--box-shadow);
`;