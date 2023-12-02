import styled, { keyframes } from 'styled-components';

export const CartMain = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  top: 0;
  bottom: 0;
  right: 0;
  background: var(--background-darker);
  box-shadow: var(--box-shadow);
`;

export const CartBody = styled.div`
  overflow-y: scroll;
  height: calc(100vh - 110px);
  padding: 10px;
`;

export const CartFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
`;

export const CartOpenButton = styled.button<{ $isMobile: boolean }>`
  ${({ $isMobile }) => ($isMobile ? ({
    position: 'fixed',
    bottom: '50px',
    margin: '25%',
    marginBottom: '0',
    border: '2px solid white',
    zoom: '1.1',
  }) : ({
    position: 'relative',
    bottom: 'auto',
    margin: 'unset',
    marginBottom: 'unset',
    border: 'unset',
    zoom: 'unset',
  }))};
`;

export const CartGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
  overflow-x: hidden;
  column-gap: 10px;
  border: 1px solid #333;
  gap: 10px;
  width: 100%;
`;

export const CartProductContainer = styled.div`
    width: 99%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    border: 2px solid white;
    background: var(--background-dark);
`;

export const CartProductInfo = styled.div`
  width: 99%;
  display: flex;
  flex-direction: row;
  color: black;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: white;
  button {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;    
  }
`;

const bounce = keyframes`
0%, 20%, 50%, 80%, 100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(-10%);
  }
  60% {
    transform: translateX(10%);
  }
`;

export const PromoText = styled.div`
    width: 100%;
    text-align: center;
    color: yellow;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    animation: ${bounce} 5s linear infinite;
    margin-top: 10px;
`;

export const CartEmpty = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
`;

export const OrderDataFormBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 8px;
  max-width: 300px;
  gap: 10px;
`;

export const OrderDataFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const OrderDataFormInfo = styled.div`
  color: yellow;
  margin-top: 10px;
  align-content: center;
  align-items: center;
  text-align: center;
`;
