import styled from "styled-components";

export const StyledSelect = styled.select<{ $isMobile: boolean }>`
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-radius: 0;
    margin: 0;
    padding-top: 6px;
    padding-bottom: 8.5px;
    width: ${({ $isMobile }) => ($isMobile ? '100%' : '350px')};
`;

export const StyledOption = styled.option<{ $isMobile: boolean }>`
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-radius: 0;
    margin: 0;
    padding-top: 6px;
    padding-bottom: 8.5px;
`;