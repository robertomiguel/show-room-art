import styled from "styled-components";

export const PassRequiredForm = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 10px;
  max-width: 300px;
  margin: auto;
  align-items: center;
  gap: 30px;
  background-color: var(--background-darker);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
`;

export const PassRequiredFormText = styled.span`
  font-weight: 700;
  letter-spacing: 3px;
  font-size: 25px;
  color: var(--text-light);
`;

export const PassRequiredFormField = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  
`;
