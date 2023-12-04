import styled, { keyframes } from 'styled-components';

const slideDownAnimation = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
  background-color: var(--background-blue);
  padding: 10px;
  border-radius: 5px;
  margin-top: -20px;
  animation: ${slideDownAnimation} 0.5s ease-in-out;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
`;

export const FormFieldRow = styled.div<{$right?: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: ${({$right}) => $right ? 'right' : 'space-between'};
  align-items: center;
  width: 100%;
  height: 45px;
`;

export const FormFieldColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  gap: 10px;
`;

export const FormCheckConfirm = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;