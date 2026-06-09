import { useState } from "react";
import OidcCallback from "./modules/auth/presentation/components/OidcCallback";
import HomeUi from "./modules/screens/home/HomeScreen";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [authError, setAuthError]         = useState<string | null>(null);

    const isCallbackRoute = window.location.pathname === "/callback";

    if (authError) {
        return <p>Erreur d&apos;authentification : {authError}</p>;
    }

    if (isCallbackRoute) {
        return (
            <OidcCallback
                onSuccess={() => {
                    setAuthenticated(true);
                    window.history.replaceState({}, "", "/");
                }}
                onError={(e) => setAuthError(e.message)}
            />
        );
    }

    if (authenticated) {
        return <>
                 <HomeUi/>
                 <p>Connecté !</p>
               </>
    }

    return <HomeUi />;
}

export default App;
