import { useForm } from "react-hook-form";
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { z } from "zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ResetPasswordSchema } from "@/schema/resetpasswordschema";
import { Eye, EyeOff } from "@untitled-ui/icons-react";

function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [show, setShow] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isExpired, setIsExpired] = useState(false)
    const [isInvalid, setIsInvalid] = useState(false);

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
        },
    })

    const togglePassword = () => {
        setShow(!show);
    }

    const onSubmit = async () => {
        const password = form.getValues("password")

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/reset-password/${token}`, {
            method: "POST",
            body: JSON.stringify({ password }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const responseData = await response.json();
        if (response.ok) {
            return setIsReset(true);
        }
        if (response.status === 400) {
            if (responseData.isExpired) {
                return setIsExpired(true);
            }

            if (responseData.isInvalid) {
                return setIsInvalid(true);
            }
        }
    };

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div className="w-full h-screen flex items-center justify-center">
            {(!isReset && !isExpired && !isInvalid) &&
                <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
                    <Link to={"/"}>
                        <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                    </Link>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl">Reset password</h1>
                            <p className="text-muted-foreground text-sm font-medium">Please provide a strong password of at least 8 characters</p>
                        </div>
                        <div className="space-y-[0.375rem]">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" ref={formRef}>
                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input {...field} type={show ? "text" : "password"} autoComplete='new-password' className="w-full" />
                                                    {
                                                        show ?
                                                            <EyeOff onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                            :
                                                            <Eye onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                    }
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <div>
                                        <Button type="submit" className="w-full">Reset Password</Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            }
            {isReset &&
                <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
                    <div>
                        <Link to={"/"}>
                            <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </Link>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold">Password reset successful</h1>
                            <p className="font-medium text-sm text-muted-foreground">Congratulations! your password has been reset</p>
                        </div>
                        <div>
                            <Button className="w-full" onClick={() => navigate("/login")}>Login Now</Button>
                        </div>
                    </div>
                </div>

            }
            {isExpired &&
                <div>
                    <div className="w-[360px] mx-auto py-8 md:py-[3.75rem] space-y-9">
                        <div>
                            <Link to={"/"}>
                                <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                            </Link>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="font-semibold text-2xl">Password reset link expired</h1>
                                <p className="font-medium text-sm text-muted-foreground">Looks like your password reset link has expired.</p>
                            </div>
                            <div>
                                <Link to={"/forgot-password"}>
                                    <Button className="w-full">Resend password reset link</Button>
                                </Link>
                            </div>
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
                            <h1 className="font-semibold text-2xl">Password reset link is invalid</h1>
                            <p className="font-medium text-sm text-muted-foreground">Looks like your password reset link has already been used or is invalid.</p>
                        </div>
                        <div>
                            <Link to={"/forgot-password"}>
                                <Button className="w-full">Resend password reset link</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ResetPassword