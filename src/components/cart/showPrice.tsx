import React from 'react'
import FireContext from '../../FireContext'
import { numberFormat } from '../common/numberFormat'
import { Price } from '../../appType'
import { PriceContainer, PriceField, PriceTotal } from './price.styled'

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

    return <PriceContainer>
        <PriceField>
            <div>Total de fotos</div><div>{price?.quantity}</div>
        </PriceField>

        <PriceField>
            <div>Subtotal</div><div>$AR {numberFormat(price?.subTotal)}</div>
        </PriceField>

        <PriceField>
            <div>Bonif. por cantidad ({price?.percentage}%)</div><div>$AR {numberFormat(price?.bonificationAmount)}</div>
        </PriceField>

        <PriceField>
            <PriceTotal>TOTAL</PriceTotal><PriceTotal>$AR {numberFormat(price?.total)}</PriceTotal>
        </PriceField>
    </PriceContainer>
}
