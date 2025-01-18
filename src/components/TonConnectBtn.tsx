import { FC } from 'react'
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react'




  const TonConnectBtn: FC = () => {
    const manifestUrl = 'https://emerald-odd-damselfly-716.mypinata.cloud/ipfs/QmfQuJCedRtwxsw9UK3EFt626ArN6fgmPBzvczv25REVgn'; 
    
    return (
      <div>
        <TonConnectUIProvider actionsConfiguration={{ twaReturnUrl: "https://t.me/lulustestbot>",
          }}
        manifestUrl={manifestUrl}
         >
         <TonConnectButton></TonConnectButton>
        </TonConnectUIProvider>
      </div>
    );
  }

export default TonConnectBtn