import React from 'react'
import FireContext from '../../FireContext'
import { Stack, Text } from '@chakra-ui/react'
import { numberFormat } from '../common/numberFormat'
import { Price } from '../../appType'

interface ShowPriceProp {
    quantity: number
}

const BONIFICATION: {[index: number]: number} = {
    1: 0,
    2: 10,
    3: 20,
    4: 30,
    5: 40,
}

export const ShowPrice = ({quantity}: ShowPriceProp) => {
    const { publicSetting, price, setPrice } = React.useContext(FireContext)

    React.useEffect(()=>{
        const percentage = quantity > 5 ? 50 : BONIFICATION[quantity]
        const subTotal = quantity * (publicSetting.dollar)
        const bonificationAmount = (subTotal * percentage) / 100
        const total = subTotal - bonificationAmount

        const newPrice: Price = {
            quantity,
            percentage,
            subTotal,
            bonificationAmount,
            total,
            dollar: publicSetting.dollar,
            date: new Date(),
        }

        setPrice(newPrice)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[quantity, publicSetting.dollar])

    return <Stack direction='column' gap='10px' width='100%' >
        <Stack direction='row' justifyContent='space-between' >
            <Text>Total de fotos</Text><Text>{price?.quantity}</Text>
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
            <Text>Subtotal</Text><Text whiteSpace='nowrap' >$AR {numberFormat(price?.subTotal)}</Text>
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
            <Text>Bonif. por cantidad ({price?.percentage}%)</Text><Text whiteSpace='nowrap' >$AR {numberFormat(price?.bonificationAmount)}</Text>
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
            <Text fontSize={20} >TOTAL</Text><Text fontSize={20} whiteSpace='nowrap' >$AR {numberFormat(price?.total)}</Text>
        </Stack>
    </Stack>
}
