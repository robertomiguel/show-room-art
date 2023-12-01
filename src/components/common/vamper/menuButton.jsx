
export const MenuButton = ({ label, show, onClick, value }) => {
    return (
        <button
            onClick={() => onClick(value === show ? null : value)}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 20px',
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
            }}
        >
            {label} {value !== show ? <span style={{ marginLeft: '5px' }}>&#x25BC;</span> : <span style={{ marginLeft: '5px' }}>&#x25B2;</span>}
        </button>
    );
};
