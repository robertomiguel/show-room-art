import React from 'react'

export const VModal = ({ children, isOpen, onClose, label }) => {

    return (
        <>
            {isOpen && <div style={{
                position: 'fixed',
                zIndex: 1,
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                overflow: 'auto',
                backgroundColor: 'rgba(95, 109, 232, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                    backgroundColor: '#232323',
                    color: '#aaa',
                    margin: '15% auto',
                    padding: '0 10px 10px',
                    border: '1px solid #888',
                    width: window.innerWidth <= 640 ? '95%' : '80%',
                    maxWidth: '600px',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '-1px 0px 19px 8px rgba(0,0,0,0.75)',
                }}>
                  <div style={{
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
                    {children}
                </div>
            </div>}
        </>
    )
}