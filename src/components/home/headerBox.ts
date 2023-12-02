import styled from "styled-components";

export const HeaderBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: var(--box-shadow);
    background: var(--background-darker);
    z-index: 4;
    padding: 5px;
`
