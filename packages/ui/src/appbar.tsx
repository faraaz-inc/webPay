


interface appBarProps {
    user?: {
        name?: string | null;
    };
    onSignIn: any,
    onSignOut: any
}

export function Appbar({user, onSignIn, onSignOut}: appBarProps) {

    return <div className="flex justify-between place-items-center border-b px-4 py-3">
        <div className="text-2xl font-semibold">
            WebPay
        </div>
        <div className="flex flex-col bg-primary text-white font-semibold rounded-lg px-4 py-2">
            <button className="" onClick={user ? onSignOut : onSignIn}>{user ? "LogOut" : "LogIn"}</button>
        </div>
        
    </div>
}