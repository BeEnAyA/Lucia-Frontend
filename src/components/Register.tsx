import { Eye, GoogleChrome } from "@untitled-ui/icons-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useRef, useState } from "react";
import { RegisterSchema } from "@/schema/register";
import { Link } from "react-router-dom";

import { handleGoogleLogin } from "./Login";


const Register = () => {
    const registrationForm = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });
    const name = registrationForm.getValues("fullName");
    const email = registrationForm.getValues("email");
    const password = registrationForm.getValues("password");

    const [isRegistered, setIsRegistered] = useState(false);

    const onSubmit = async () => {

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signup`, {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const data = await response.json();
        if (response.ok) {
            setIsRegistered(true);
        }

        if (response.status === 409) {
            alert(data.error);
        }
    };

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <>
            {!isRegistered ?
                <div className="space-y-9 w-[360px] mx-auto py-8 md:py-[3.75rem]">
                    <Link to={"/"}>
                        <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                    </Link>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl">Sign Up</h1>
                            <p className="text-muted-foreground font-medium text-sm">
                                Already have an account?{" "}
                                <Link to={"/login"}>
                                    <span className="text-foreground">Sign in</span>
                                </Link>
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <Form {...registrationForm}>
                                    <form
                                        onSubmit={registrationForm.handleSubmit(onSubmit)}
                                        className="space-y-4"
                                        ref={formRef}
                                    >
                                        <FormField
                                            control={registrationForm.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="text" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={registrationForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="email" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={registrationForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input {...field} type="password" autoComplete='new-password' className="w-full" />
                                                            <Eye className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <Button
                                        className="w-full py-[0.625rem] px-[0.875rem]"
                                        onClick={() => registrationForm.handleSubmit(onSubmit)()}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                <div className="text-[0.875rem] leading-[1.3125rem] font-normal">
                                    <p className="text-muted-foreground">
                                        By signing up, you agree to Radian's{" "}
                                        <span className="text-foreground">Terms of Service</span> and{" "}
                                        <span className="text-foreground">Privacy Policy</span>
                                    </p>
                                </div>
                                <div className="flex items-center justify-center w-full">
                                    <hr className="flex-1 border-t" />
                                    <span className="mx-[0.625rem] text-muted-foreground">or</span>
                                    <hr className="flex-1 border-t" />
                                </div>
                                <div className="">
                                    <Button variant={"outline"} className="w-full text-foreground gap-[0.375rem]  py-[0.625rem] px-[0.875rem]" onClick={() => handleGoogleLogin()}>
                                        <GoogleChrome />
                                        Continue with Google
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[360px] mx-auto space-y-9 bg-background py-8 md:py-[3.75rem]">
                        <Link to={"/"}>
                            <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                        </Link>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-semibold">Check your email</h1>
                                <p className="text-muted-foreground text-sm font-medium">We've sent the email verification link to <span className="font-semibold">{email}</span></p>
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
    );
}

export default Register;
