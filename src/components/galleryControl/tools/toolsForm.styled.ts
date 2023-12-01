import styled from 'styled-components';

export const ToolsFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  gap: 10px;
  background-color: var(--background-blue);
  padding: 10px;
  border-radius: 5px;
  margin-top: -20px;
`;

export const ToolsFormFieldRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 45px;
`;

export const ToolsFormFieldColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  gap: 10px;
`;

export const ToolsFormCheckConfirm = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;