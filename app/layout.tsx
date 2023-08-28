import './globals.css';
import NavBar from '@/components/navbar/NavBar';
import {Providers} from "@/providers/provider";
import ToastProvider from "@/providers/toast.provider";

import {Metadata} from "next";
import CartProvider from "@/providers/cart.provider";

export const metadata = {
    title: 'Next App',
    description: "Generated by create next app",
};
export default function RootLayout({children,}: { children: React.ReactNode; }) {
    return (
        <html lang="en">
        <body style={{background: '#F5F5F5', display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Providers>
            <ToastProvider>
                <CartProvider>
                    <NavBar/>
                    <div style={{flex: '1'}}>
                        {children}
                    </div>
                </CartProvider>
            </ToastProvider>
        </Providers>
        </body>
        </html>
    );
};
