import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OidcCallback from "./modules/auth/presentation/components/OidcCallback";
import HomeUi from "./screens/HomeScreen";
import ContactScreen from "./screens/contactScreen";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const [authError, setAuthError]         = useState<string | null>(null);

    if (authError) {
        return <p>Erreur d&apos;authentification : {authError}</p>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"        element={<HomeUi />} />
                <Route path="/contact" element={<ContactScreen />} />
                <Route
                    path="/callback"
                    element={
                        authenticated ? (
                            <Navigate to="/" replace />
                        ) : (
                            <OidcCallback
                                onSuccess={() => setAuthenticated(true)}
                                onError={(e) => setAuthError(e.message)}
                            />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
