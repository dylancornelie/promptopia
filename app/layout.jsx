import '@styles/global.css'
import Nav from "@components/Nav"
import Provider from "@components/Provider"

export const metadata = {
    title: "Promptopia",
    description: "Discover & share AI prompt"
}

function RootLayout({ children }) {
    return (
        <html>
            <Provider>
                <body>
                    <div className="main">
                        <div className="gradiant" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </body>
            </Provider>
        </html>
    )
}

export default RootLayout