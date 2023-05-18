import { create } from 'zustand'

interface LoginModalStore {

    isOpened: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpened: false,
    onOpen: () => set({ isOpened: true }),
    onClose: () => set({ isOpened: false }),
}))

export default useLoginModal;

// The set function is a method provided by the zustand
// library that is used to update the state of a state container.

// When you call set with an object that describes the
//  changes you want to make to the state, the zustand library
//  automatically updates the state of the container and triggers
// a re-render of any components
//  that are subscribed to that state.