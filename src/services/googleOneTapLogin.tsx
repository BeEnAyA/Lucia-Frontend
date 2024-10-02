import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const useGoogleLogin = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    useGoogleOneTapLogin({
        onSuccess: async (credentialResponse) => {
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
                } else {
                    alert(responseData.message);
                    navigate("/login");
                }
            } catch (error) {
                alert("An error occurred. Please try again.");
            }
        },
        onError: () => {
            alert("Couldn't connect to Google");
        },
    });
};

export default useGoogleLogin;
