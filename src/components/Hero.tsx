import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { useGoogleOneTapLogin } from "@react-oauth/google"
import { useAuth } from "@/context/authContext";


function Hero() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    useGoogleOneTapLogin({
        onSuccess: async credentialResponse => {
            console.log(credentialResponse)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login/google/callback`, {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({ idToken: credentialResponse.credential }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseData = await response.json();
                if (response.ok) {
                    setIsAuthenticated(true);
                    navigate("/");
                    alert(responseData.message);
                    return
                }
                if (response.status >= 400) {
                    alert(responseData.message);
                    navigate("/login")
                }
            } catch (error) {
                alert("An error occurred. Please try again.");
            }

        },
        onError: () => {
            alert("Couldn't connect to Google")
        },
    })
    return (
        <div className="min-w-screen py-8 sm:py-[3.75rem]">
            <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-14 px-5 sm:gap-20 sm:px-6 lg:flex-row">
                <div className="flex flex-col justify-center sm:w-[640px]">
                    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-9">
                        {/* Slogan Start */}
                        <div className="text-4xl font-semibold leading-[2.75rem] -tracking-[0.045rem] text-foreground sm:text-5xl sm:leading-[3.75rem] sm:-tracking-[0.06rem] lg:text-6xl lg:leading-[4.5rem] lg:-tracking-[0.075rem]">
                            Authentication made easier and faster
                        </div>
                        {/* Slogan End */}

                        <div className="text-base font-normal text-foreground sm:text-lg">
                            Start your authentication journey with high-quality, industry-standard security. Implement authentication seamlessly with Lucia. Built with{" "}
                            <span className="font-semibold">
                                Typescript, Express, Drizzle
                            </span>{" "}
                            and <span className="font-semibold">Postgres</span>.
                        </div>
                    </div>
                    {/* CONFUSION: Regarding the size of the buttons */}
                    <div className="mt-8 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4 lg:mt-10">
                        <Button className="w-full sm:w-fit" size={"lg"} asChild>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                        <Button className="w-full sm:w-fit" size={"lg"} variant={"outline"} asChild>
                            <Link to={'/register'}>Register</Link>
                        </Button>
                    </div>
                </div>

                <div className="flex h-[13.75rem] items-center justify-center sm:h-[25.313rem] lg:h-[29.75rem] lg:w-[31.375rem]">
                    <img
                        src="Lucia.svg"
                        alt="No preview"
                        className="size-full rounded-2xl object-cover"
                    />
                </div>
            </div>
        </div>

    )
}

export default Hero