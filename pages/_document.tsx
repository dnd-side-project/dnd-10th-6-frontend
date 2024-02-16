import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG}`}
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.NEXT_PUBLIC_G_TAG}');
        `}
        </Script>
        <Script id="welcome-namui-wiki-app" strategy="beforeInteractive">
          {`
        console.log(\`
                                                                                                    
                                                                                                    
%c                                                 ▓▓▓▓▓▓                                             
%c                                                ▓▓▓▓▓▓▓                                             
%c                                               ▓▓▓▓▓▓▓▓▓                                            
%c                                               ▓▓▓▓▓▓▓▓▓▓                                           
%c                                              ▓▓▓▓▓▓▓▓▓▓▓                                           
%c                                              ▓▓▓▓▓▓▓▓▓▓▓▓                                          
%c                                              ▓▓▓▓▓▓▓▓▓▓▓▓                                          
%c                                              ▓▓▓▓▓▓▓▓▓▓▓▓▓                                         
%c                                             ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                       
%c                                           ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                      
%c                                        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                     
%c                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                    
%c                                     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                   
%c                                     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                    
%c                                      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                     
%c                                   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                   
%c                                 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                  
%c                               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                 
%c                               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                
%c                               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                               
%c                                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                               
%c                                  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                
%c                                       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                
%c                                        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                  
%c                                         ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                      
%c                                                    ▓▓▓▓▓▓▓▓▓                                       
                                                       ▓▓▓▓                                         
                                                                                                    
                                                                                                    
                                                                                          ▓▓        
                                                                                        ▓▓▓▓▓▓      
                                                                                        ▓▓▓▓▓▓▓     
                                                                                         ▓▓▓▓       
        ▓▓   ▓▓▓▓▓          ▓▓▓▓▓   ▓▓       ▓▓▓  ▓▓▓▓     ▓▓▓▓▓        ▓          ▓      ▓▓        
     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓▓▓▓▓      ▓▓▓▓▓  ▓▓▓▓▓▓      
     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓▓  ▓▓▓▓▓▓      
     ▓▓▓▓▓▓▓   ▓▓▓▓▓▓  ▓▓▓▓▓▓     ▓▓▓▓▓▓▓  ▓▓▓▓▓▓   ▓▓▓▓▓▓▓   ▓▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓▓  ▓▓▓▓▓▓      
     ▓▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓       ▓▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓▓  ▓▓▓▓▓▓      
     ▓▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓       ▓▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓▓  ▓▓▓▓▓▓      
     ▓▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓▓     ▓▓▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓▓    ▓▓▓▓▓▓  ▓▓▓▓▓▓      
     ▓▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓      
     ▓▓▓▓▓▓     ▓▓▓▓▓    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ▓▓▓▓▓     ▓▓▓▓▓     ▓▓▓▓▓   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓      
      ▓▓▓▓       ▓▓▓▓      ▓▓▓▓▓▓▓ ▓▓▓▓▓    ▓▓▓       ▓▓▓       ▓▓▓      ▓▓▓▓▓▓▓▓▓▓▓▓    ▓▓▓▓       
                                                                                                    
                                                                                                    
                                                                                                    

        \`, "color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68","color:#00BC68")
        `}
        </Script>
      </Head>
      <body className="text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
