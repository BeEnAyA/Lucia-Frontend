import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const handleGoogleCallback = async () => {
            const params = new URLSearchParams(window.location.search);
            const state = params.get('state');
            const code = params.get('code');


            try {
                const response = await fetch("http://localhost:4000/login/google/callback", {
                    method: 'POST',
                    body: JSON.stringify({ state: state, code: code }),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseData = await response.json();
                if (response.ok) {
                    setIsAuthenticated(true);
                    navigate("/");
                    console.log(responseData.data)
                    alert(responseData.message);
                } else {
                    alert(responseData.message);
                    navigate("/login")
                }
            } catch (error) {
                alert("An error occurred. Please try again.");
            }
        };

        handleGoogleCallback();
    }, []);


    return null;
}
export default GoogleCallback;