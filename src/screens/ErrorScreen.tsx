import { useParams, useNavigate } from "react-router-dom";
import { loginUseCase } from "../modules/auth/di/authContainer";

interface ErrorConfig {
    title:       string;
    description: string;
    actionLabel: string;
    action:      () => void | Promise<void>;
}

export default function ErrorScreen() {
    const { status, message } = useParams<{ status: string; message?: string }>();
    const navigate            = useNavigate();

    const code        = status ? parseInt(status, 10) : 404;
    const description = message ? decodeURIComponent(message) : undefined;

    const ERROR_CONFIGS: Record<number, ErrorConfig> = {
        0: {
            title:       "Server unreachable",
            description: "Unable to connect to the server. Check your internet connection or try again later.",
            actionLabel: "Try again",
            action:      () => navigate(-1),
        },
        401: {
            title:       "Unauthorized",
            description: "Your session has expired or you are not signed in.",
            actionLabel: "Sign in",
            action:      async () => {
                try {
                    await loginUseCase.execute();
                } catch {
                    navigate("/");
                }
            },
        },
        403: {
            title:       "Forbidden",
            description: "You don't have permission to access this resource.",
            actionLabel: "Go home",
            action:      () => navigate("/"),
        },
        404: {
            title:       "Page not found",
            description: "The page you're looking for doesn't exist or has been moved.",
            actionLabel: "Go home",
            action:      () => navigate("/"),
        },
        500: {
            title:       "Server error",
            description: "Something went wrong on our end. Please try again later.",
            actionLabel: "Try again",
            action:      () => navigate(-1),
        },
    };

    const FALLBACK: ErrorConfig = {
        title:       "Unexpected error",
        description: "Something unexpected happened. Please try again.",
        actionLabel: "Go home",
        action:      () => navigate("/"),
    };

    const config = ERROR_CONFIGS[code] ?? FALLBACK;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">
            {code !== 0 && (
                <p className="text-7xl font-black text-indigo-500 sm:text-9xl">{code}</p>
            )}

            <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                {config.title}
            </h1>

            <p className="mt-3 max-w-md text-sm text-slate-400">
                {description ?? config.description}
            </p>

            <div className="mt-8 flex gap-3">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                >
                    Go back
                </button>
                <button
                    type="button"
                    onClick={() => void config.action()}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                    {config.actionLabel}
                </button>
            </div>
        </div>
    );
}
