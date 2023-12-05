import styled, { keyframes } from "styled-components"

const fadeInFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CalendarContainer = styled.div`
    width: 300px;
    background-color: var(--background-darker);
    padding: 10px;
    border-radius: 10px;
    box-shadow: var(--box-shadow);
    animation: ${fadeInFromTop} 0.5s ease-in-out;
`

export const CalendarHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 1.2rem;
        font-weight: bold;
    }
`

export const CalendarWeekDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
`

export const CalendarMonthDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`

export const DayContent = styled.div<{$disabled?: boolean, $selected?: boolean, $toDay?: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30px;
    color: ${props => !props.$disabled ? 'var(--text-light)' : 'black'};
    width: 30px;
    border-radius: 50%;
    margin: 4px;
    cursor: ${props => !props.$disabled ? 'pointer' : 'default'};
    &:hover {
        outline: ${props => !props.$disabled ? '2px solid var(--text-light)' : 'unset'};
    }
    background-color: ${props => props.$selected ? 'var(--border-light)' : 'transparent'};
    color: ${props => props.$selected ? 'var(--background-dark)' : 'inherit'};
`

export const DayName = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    margin: 4px;
`
