import React from 'react'

export const MenuButton = ({text, show, onClick}) => {

    return <button
                onClick={onClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 20px',
                    backgroundColor: 'rgb(150,0,0)',
                    color: 'white',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    border: 'none',
                    textAlign: 'right',
                    textDecoration: 'none',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    justifyContent: 'space-between',
                    borderRadius: '5px',
                }} >
                    {text} {!show 
                                        ? <span style={{marginLeft: '5px'}}>&#x25BC;</span>
                                        : <span style={{marginLeft: '5px'}}>&#x25B2;</span>}
            </button>
}