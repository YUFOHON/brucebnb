'use client';
import { useState, useEffect } from 'react';


interface ClientOnlyProps {
    children: React.ReactNode
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hastMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hastMounted) { return null; }

    return (
        <>
            {children}
        </>
    );
}

export default ClientOnly;