import React from "react";

export const HeaderModal = ({onClose, label }) => {
    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: '1px solid #dbdbdb',
    }} >
      <div style={{fontStyle: 'italic'}} >{label}</div>
      <div style={{
          color: '#aaa',
          fontSize: '28px',
          fontWeight: 'bold',
          cursor: 'pointer',
          width: 'auto',
      }} onClick={onClose}>&times;</div>
    </div>
}