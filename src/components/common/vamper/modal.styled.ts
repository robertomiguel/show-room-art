import styled, { keyframes } from 'styled-components';

const slideInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ScreenBlackout = styled.div`
  position: fixed;
  z-index: 4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color:rgba(26, 26, 26, 0.8); /* rgba(30, 30, 30, 0.8); - Fondo oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideInAnimation} 0.5s ease;
  transition: opacity 0.5s ease;
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
  box-shadow: var(--box-shadow);
`;