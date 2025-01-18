import { FC } from 'react'
import Footer from './Footer';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const Layout: FC<any> = ({children}) => {

  const manifestUrl = 'https://emerald-odd-damselfly-716.mypinata.cloud/ipfs/QmfQuJCedRtwxsw9UK3EFt626ArN6fgmPBzvczv25REVgn'; 
    
  const gradientStyle = {
    background: 'linear-gradient(to top, black, rgb(60, 93, 160))',
    minHeight: '700px', 
  };
return (
<div >
      <main className="content"></main>
      <TonConnectUIProvider actionsConfiguration={{ twaReturnUrl: "https://t.me/lulustestbot>",
          }}
        manifestUrl={manifestUrl}
         >
          <div style={gradientStyle}>{children}</div>
         </TonConnectUIProvider>
       
      <Footer />
    </div>
)}

export default Layout