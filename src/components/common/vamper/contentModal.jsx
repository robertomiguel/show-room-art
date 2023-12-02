import { HeaderModal } from './headerModal';
import { DarkModal, ScreenBlackout } from './modal.styled';

export const ContentModal = ({ children, isOpen, onClose, label }) => {
    return (
        <>
            {isOpen && (
                <ScreenBlackout>
                    <DarkModal>
                        <HeaderModal onClose={onClose} label={label} />
                        {children}
                    </DarkModal>
                </ScreenBlackout>
            )}
        </>
    );
};
