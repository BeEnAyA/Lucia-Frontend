import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"

function PasswordResetEmailSent() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email"); // Get the email from the query parameter
    return (
        <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
            <Link to={"/"}>
                <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
            </Link>
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold">Check your email</h1>
                    <p className="text-muted-foreground text-sm font-medium">We've sent the password reset instructions to <span className="font-semibold">{email ? email : 'someone@domain.com'}</span></p>
                </div>
                <div className="space-y-3 flex flex-col">
                    <Button className="py-[0.625rem] px-[0.875rem]" asChild>
                        <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">Open email application</a>
                    </Button>
                    <Button className="py-[0.625rem] px-[0.875rem]" variant={"outline"} asChild>
                        <Link to={"/login"}>Back to Sign in</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PasswordResetEmailSent