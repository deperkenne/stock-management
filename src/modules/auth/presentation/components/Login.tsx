import Button from "../../../../shared/components/Button";
import { loginUseCase } from "../../di/authContainer";

interface LoginButtonProps {
    className?: string;
    ButtonName?:string;
}
// this fonction muss have one responsability and another reponsabilities 
// muss be to delegate 
export default function LoginButton({ className, ButtonName}: LoginButtonProps) {
    const handleLogin = () => {
        loginUseCase.execute();
    };

    return (
        <Button onClick={handleLogin} className={className}>{ButtonName}</Button>
    );
}
