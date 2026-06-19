import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import OidcCallback from "./modules/auth/presentation/components/OidcCallback";
import HomeUi from "./screens/HomeScreen";
import ContactScreen from "./screens/contactScreen";
import ErrorScreen from "./screens/ErrorScreen";
import DashboardUi from "./screens/DashboardScreen";

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
                <Route path="/contact"        element={<ContactScreen />} />
                <Route path="/dashboard"        element={<DashboardUi />} />
                <Route path="/error/:status/:message" element={<ErrorScreen />} />
                <Route path="*"                      element={<ErrorScreen />} />
                <Route
                    path="/callback" // une fois le user entre ses credentiel  keykloack le renvoie vers ce chemin
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
