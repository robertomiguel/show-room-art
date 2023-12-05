import { useEffect, useState } from "react"
import { CalendarContainer, CalendarHeader, CalendarMonthDays, CalendarWeekDays, DayContent, DayName } from "./calendar.styled"
import { generateId } from "./generateId"

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

interface CalendarProps {
    value?: Date | null
    onChange?: (date: Date) => void
}

interface DateData {
    day: number
    month: number
    year: number
    weekDay: number
    startDay: number
    daysInMonth: number
}

export const Calendar = ({value, onChange}: CalendarProps) => {

    const [ dateData, setDateData ] = useState<DateData>()

    const updateDateData = (valueDate: Date) => {
        setDateData({
            day: valueDate.getUTCDate(),
            month: valueDate.getUTCMonth(),
            year: valueDate.getFullYear(),
            weekDay: valueDate.getUTCDay(),
            startDay: new Date(valueDate.getFullYear(), valueDate.getUTCMonth(), 1).getDay(),
            daysInMonth: new Date(valueDate.getFullYear(), valueDate.getUTCMonth() + 1, 0).getDate()
        })
    }

    useEffect(() => {
        updateDateData(value ?? new Date())
    }, [value])

    const handleMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(dateData?.year ?? 0, parseInt(e.target.value), dateData?.day ?? 0)
        updateDateData(newDate)
    }

    const handleYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDate = new Date(parseInt(e.target.value), dateData?.month ?? 0, dateData?.day ?? 0)
        updateDateData(newDate)
    }

    const handleDay = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!dateData) return
        const newDate = new Date(dateData?.year ?? 0, dateData?.month ?? 0, parseInt(e.currentTarget.innerText))
        updateDateData(newDate)
        onChange && onChange(newDate)
    }

    return <CalendarContainer>

        <CalendarHeader>
            <select value={dateData?.month} onChange={handleMonth} >
                {MONTHS.map( (monthName, index) =>
                    <option key={generateId()} value={index}>{monthName}</option>)}
            </select>
            <select value={dateData?.year} onChange={handleYear} >
                {Array.from({length: 20 }).map( (_, idx) =>
                    <option key={generateId()} value={2023 - 16 + idx}>{2023 - 16 + idx}</option>)}
            </select>
        </CalendarHeader>

        <CalendarWeekDays>
            {DAYS.map( (dayName, index) =>
                <DayName key={generateId()}>
                        {index === dateData?.weekDay ? <span style={{fontWeight: 700}} >{dayName}</span> : dayName}
                </DayName>)}
        </CalendarWeekDays>

        <CalendarMonthDays>
            {Array.from({length: dateData?.startDay ?? 0}).map( () => <div key={generateId()} />)}
            {Array.from({length: dateData?.daysInMonth ?? 0}).map( (_, index: number) =>
                <DayContent
                    onClick={handleDay}
                    $selected={value
                    ? ((
                        index + 1 === dateData?.day) 
                        && (dateData?.month === value.getMonth())
                        && (dateData?.year === value.getFullYear()))
                    : false}
                    key={generateId()}>
                        {index + 1}
                </DayContent>)}
        </CalendarMonthDays>

    </CalendarContainer>
}