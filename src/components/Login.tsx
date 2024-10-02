import { Eye, GoogleChrome, Loading01 } from "@untitled-ui/icons-react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { LoginSchema } from "../schema/login";
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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import useGoogleLogin from "@/services/googleOneTapLogin";


export const handleGoogleLogin = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login/google`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    console.log(data)
    if (response.ok) {
        return window.open(data.url, '_self');
    }
    if (response.status >= 400) {
        return window.alert(data.message)
    }
}

const Login = () => {
    useGoogleLogin();
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const email = form.getValues("email")
            const password = form.getValues("password")
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signin`, {
                method: "POST",
                body: JSON.stringify({ email: email, password: password }),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json();
            if (response.ok) {
                form.reset();
                setIsAuthenticated(true);
                setIsLoading(false)
                navigate("/")
                return alert(data.message);
            }
            if (response.status >= 400) {
                if (data.redirectTo) {
                    navigate("/verify-email")
                }
                setIsLoading(false)
                setIsAuthenticated(false)
                return alert(data.message);
            }

        } catch (error) {
            setIsLoading(false)
            alert("Oops! Something went wrong")
        } finally {
            setIsLoading(false)
        }
    };

    const formRef = useRef<HTMLFormElement>(null);

    return (
        // Using shadcn ui form
        <div className="py-8 md:py-[3.75rem]">

            <div className="mx-auto w-[408px] px-6 py-8 ">
                <div className="space-y-9 w-[360px]  mx-auto">
                    <Link to={"/"}>
                        <img src="/Lucia.svg" alt="logo" className='h-8 dark:saturate-0 dark:brightness-50 dark:invert' />
                    </Link>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl">Sign in</h1>
                            <p className="text-muted-foreground font-medium text-sm">
                                Don't have an account yet?{" "}
                                <Link to={"/register"}>
                                    <span className="text-foreground">Sign up</span>
                                </Link>
                            </p>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-4">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" ref={formRef}>
                                        <FormField
                                            control={form.control}
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
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex justify-between">
                                                        Password{" "}
                                                        <Link to={"/forgot-password"} className="text-muted-foreground font-medium text-sm">
                                                            Forgot Password?
                                                        </Link>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input {...field} type="password" className="w-full" />
                                                            <Eye className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div>
                                            <div className="space-x-2">
                                                <Checkbox id="terms" />
                                                <label
                                                    htmlFor="terms"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Keep me signed in
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </div>

                            <div>
                                {isLoading ?
                                    <Button className="w-full py-[0.625rem] px-[0.875rem]">
                                        <Loading01 className="h-6 animate-spin" />
                                    </Button>
                                    :
                                    <Button className="w-full py-[0.625rem] px-[0.875rem]" onClick={() => form.handleSubmit(onSubmit)()}>
                                        Sign In
                                    </Button>
                                }
                            </div>
                            <div className="flex items-center justify-center w-full">
                                <hr className="flex-1 border-t" />
                                <span className="mx-[0.625rem] text-muted-foreground">or</span>
                                <hr className="flex-1 border-t" />
                            </div>
                            <div className="">
                                <Button variant={"outline"} className="w-full text-foreground gap-[0.375rem]  py-[0.625rem] px-[0.875rem]" onClick={handleGoogleLogin}>
                                    <GoogleChrome />
                                    Continue with Google
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
