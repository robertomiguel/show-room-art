import { HeaderModal } from './headerModal';

export const ContentModal = ({ children, isOpen, onClose, label }) => {
    return (
        <>
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        zIndex: 4,
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        backgroundColor: 'rgba(30, 30, 30, 0.8)', // Fondo oscuro
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#1E1E1E', // Fondo principal oscuro
                            color: '#CCCCCC', // Texto claro
                            margin: '15% auto',
                            padding: '0 10px 10px',
                            border: '1px solid #333333', // Borde oscuro
                            width: window.innerWidth <= 640 ? '95%' : 'auto',
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '-1px 0px 19px 8px rgba(0,0,0,0.75)',
                        }}
                    >
                        <HeaderModal onClose={onClose} label={label} />
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};
