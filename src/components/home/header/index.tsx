
import NavigationBar from "../../../shared/components/navigationBar/NavigationBar"
import LoginButton from "../../../modules/auth/presentation/components/Login"

export default function Header(){
   
    return  <NavigationBar
            actions={<LoginButton ButtonName="Sign in" />}
            mobileActions={<LoginButton ButtonName="Sign in" className="w-full" />}
          />

}