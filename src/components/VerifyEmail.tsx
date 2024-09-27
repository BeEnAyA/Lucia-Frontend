import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const VerifyEmail = () => {
    const { token } = useParams();
    const [isExpired, setIsExpired] = useState(false)
    const [isVerified, setIsVerified] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token)
        const verifyEmail = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/verify-email/${token}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )

            const responseData = await response.json();
            if (response.ok) {
                setIsVerified(true);
            }
            if (response.status === 400) {
                if (responseData.isInvalid) {
                    return setIsInvalid(true)
                }
                if (responseData.isExpired) {
                    return setIsExpired(true)
                }
                navigate("/login")
            }
        }
        verifyEmail()
    }, [])

    const handleResendVerificationLink = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/resend-email-verification/${token}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }

        )
        const responseData = await response.json();

        if (response.ok) {
            setResendSuccess(true);
            setIsExpired(false);
            setIsInvalid(false);
            setIsVerified(false);
            return;
        }

        alert(responseData.message)
    }
    return (
        <>
            {isVerified &&
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
                        <div>
                            <img src="/Lucia.svg" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-semibold">Account verified</h1>
                                <p className="font-medium text-sm text-muted-foreground">Congratulations! your email has been verified</p>
                            </div>
                            <div>
                                <Button className="w-full" onClick={() => navigate("/login")}>Login Now</Button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {isExpired &&
                <div className="w-[360px] mx-auto py-8 md:py-[3.75rem] space-y-9">
                    <div>
                        <Link to={"/"}>
                            <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </Link>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl">Verification link expired</h1>
                            <p className="font-medium text-sm text-muted-foreground">Looks like your email verification link has expired. No worries we can send the link again</p>
                        </div>
                        <div>
                            <Button className="w-full" onClick={() => handleResendVerificationLink()}>Resend verification link</Button>
                        </div>
                    </div>
                </div>
            }

            {isInvalid &&
                <div className="w-[360px] mx-auto py-8 md:py-[3.75rem] space-y-9">
                    <div>
                        <Link to={"/"}>
                            <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </Link>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl">Verification link is invalid</h1>
                            <p className="font-medium text-sm text-muted-foreground">Looks like your email verification link has already been used or is invalid.</p>
                        </div>
                    </div>
                </div>
            }

            {resendSuccess &&
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
                        <Link to={"/"}>
                            <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </Link>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-semibold">Check your email</h1>
                                <p className="text-muted-foreground text-sm font-medium">We've resent the email verification link to email.</p>
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
                </div>
            }
        </>
    )
};

export default VerifyEmail;
