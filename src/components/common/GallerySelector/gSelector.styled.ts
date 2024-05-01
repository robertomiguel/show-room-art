import mediaQuery from "mediaQueries";
import styled from "styled-components";

export const StyledSelect = styled.select`
    font-size: 1.2rem;
    letter-spacing: 1px;
    margin: 0;
    padding-top: 6px;
    padding-bottom: 8.5px;
    width: 350px;
    @media ${mediaQuery.mobile} {
        width: 100%;
    }
`;

export const StyledOption = styled.option`
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-radius: 0;
    margin: 0;
    padding-top: 6px;
    padding-bottom: 8.5px;
`;

export const GalleryLegend = styled.fieldset`
    padding: 0;
    border-radius: 5px;
    text-align: center;
    border: none;
    width: auto;
    @media ${mediaQuery.mobile} {
        width: 90%;
    }
`;