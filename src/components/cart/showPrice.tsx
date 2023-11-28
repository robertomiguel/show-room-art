import React from 'react'
import FireContext from '../../FireContext'
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

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>Total de fotos</div><div>{price?.quantity}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>Subtotal</div><div>$AR {numberFormat(price?.subTotal)}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div>Bonif. por cantidad ({price?.percentage}%)</div><div>$AR {numberFormat(price?.bonificationAmount)}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{fontSize: '24px'}} >TOTAL</div><div>$AR {numberFormat(price?.total)}</div>
        </div>
    </div>
}
