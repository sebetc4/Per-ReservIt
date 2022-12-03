import React, { ReactNode } from 'react';
import { Header, Footer } from '..';
import { AlertComponent } from '../../components';

interface ILayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <AlertComponent />
        </>
    );
}
