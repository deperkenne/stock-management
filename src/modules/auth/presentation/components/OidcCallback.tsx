import { useEffect, useRef, useState } from "react";
import { handleCallbackUseCase } from "../../di/authContainer";

interface Props {
    onSuccess: () => void;
    onError:   (error: Error) => void;
}

export default function OidcCallback({ onSuccess, onError }: Props) {
    const [loading, setLoading] = useState(true);
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        handleCallbackUseCase
            .execute()
            .then((authenticated) => {
                setLoading(false);
                if (authenticated) onSuccess();
            })
            .catch((err: unknown) => {
                setLoading(false);
                onError(err instanceof Error ? err : new Error("Authentication failed."));
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <p>Authentification en cours…</p>;
    return null;
}
