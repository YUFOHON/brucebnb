import './globals.css'
import { Inter, Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
// import Modal from './components/Modal/Modal';
import RegisterModal from './components/Modal/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modal/LoginModal';
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from './components/Modal/RentModal';
import { User } from '@prisma/client';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb_Bruce',
  description: 'Generated by create next app',
}

const font = Nunito({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()


  return (
    <html lang="en">
      <body className={font.className}>

        <ClientOnly>
          <RentModal />
          <RegisterModal />
          <LoginModal />
          {/* <Modal actionLabel='Submit' isOpen title='hello' /> */}
          <Navbar currentUser={currentUser} />
          <ToasterProvider />

        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}

        </div>

      </body>
    </html>
  )
}
