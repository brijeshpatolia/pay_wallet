import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b border-gray-300 px-8">

       <div className="text-xl text-[#6a51a6] font-bold flex flex-col justify-center">

            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button   onClick={user ? onSignout : onSignin}  >{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}