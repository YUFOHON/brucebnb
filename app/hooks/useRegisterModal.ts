import { create } from 'zustand'

interface RegisterModalStore {

    isOpened: boolean;
    stillOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpened: false,
    stillOpen: false,
    onOpen: () => set({ isOpened: true }),
    onClose: () => set({ isOpened: false }),
}))

export default useRegisterModal;

// The set function is a method provided by the zustand
// library that is used to update the state of a state container.

// When you call set with an object that describes the
//  changes you want to make to the state, the zustand library
//  automatically updates the state of the container and triggers
// a re-render of any components
//  that are subscribed to that state.