import { isEmail } from "components/common/emailValidator";
import { OrderDataFormBody, OrderDataFormField, OrderDataFormInfo } from "./cart.styled";

interface OrderDataFormProps {
    customerName: string;
    setCustomerName: (name: string) => void;
    customerEmail: string;
    setCustomerEmail: (email: string) => void;
    sendMessage: () => void;
}

export const OrderDataForm = ({ customerEmail, setCustomerName, setCustomerEmail, customerName, sendMessage }: OrderDataFormProps) => {

    return <OrderDataFormBody>
        <OrderDataFormField>
            <div>Nombre</div>
            <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} />
        </OrderDataFormField>
        <OrderDataFormField>
            <div>Email para recibir las fotos</div>
            <input value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} type='email' />
        </OrderDataFormField>
        <OrderDataFormInfo>
            <div style={{ whiteSpace: 'break-spaces' }} >El pedido se envía por whatsapps al confirmar.</div>
            <div>Forma de pago a convenir.</div>
        </OrderDataFormInfo>
        <button disabled={customerName.trim() === '' || !isEmail(customerEmail)}
            onClick={sendMessage} >
            Confirmar pedido (WSP)
        </button>
    </OrderDataFormBody>
}