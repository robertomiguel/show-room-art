
export const HeaderModal = ({onClose, label }) => {
    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation()
        onClose();
    }
    return <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #dbdbdb',
        margin: '0px 0px 10px 0px',
        padding: '5px 0px',
    }} >
      <p style={{paddingLeft: '10px'}}>{label}</p>
      <button style={{
          color: '#aaa',
          fontSize: '28px',
          fontWeight: 'bold',
          width: 'auto',
          padding: 0,
          background: 'none',
      }} onClick={handleClose}>&times;</button>
    </div>
}