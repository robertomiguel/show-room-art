import styled from 'styled-components';

export const ScreenBlackout = styled.div`
  position: fixed;
  z-index: 4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(30, 30, 30, 0.8); /* Fondo oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DarkModal = styled.div`
  background-color: var(--background-darker);
  color: #CCCCCC;
  margin: 15% auto;
  padding: 0 10px 10px;
  border: 1px solid #333333;
  width: ${({ theme }) => (theme.windowWidth <= 640 ? '95%' : 'auto')};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;