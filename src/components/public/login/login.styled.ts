import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    background: var(--background-darker);
    padding: 5px;
    padding: 10px;
    border-radius: 5px;
    gap: 10px;
    box-shadow: var(--box-shadow);
`;

export const LoginInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const LoginButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;