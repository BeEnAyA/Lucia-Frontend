import { useAuth } from "@/context/authContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface User {
    profile: string,
    email: string,
    name: string,
}

const ProfileCard = () => {
    const { setIsAuthenticated } = useAuth();
    const [user, setUser] = useState<User>({ profile: "", email: "", name: "", });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:4000/get-user-details', {
                    method: 'GET',
                    credentials: "include"
                });
                const responseData = await response.json();
                if (response.ok) {
                    setUser(responseData.data);
                    console.log(responseData.data)
                } else {
                    // Handle error gracefully
                    console.error("Error fetching user details:", responseData);
                }
            } catch (error) {
                console.error("Network error:", error);
            }
        };

        fetchUserDetails(); // Call the async function
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
                method: 'GET',
                credentials: "include"
            });
            const responseData = await response.json();
            if (response.ok) {
                setIsAuthenticated(false);
                navigate("/");
                alert(responseData.message); // Consider replacing this with a toast or UI message
            } else {
                console.error("Logout error:", responseData);
            }
        } catch (error) {
            console.error("Network error during logout:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-sm w-full rounded-lg shadow-lg overflow-hidden">
                <img
                    className="w-full size-48 object-contain"
                    src={user?.profile ?? "https://cdn-icons-png.flaticon.com/512/21/21104.png"}
                    alt="Profile"
                />
                <div className="p-6 text-center">
                    <h2 className="text-xl font-semibold">{user?.email}</h2>
                    <p className='text-muted-foreground'>{user?.name || "No Name Provided"}</p>
                    <div className="text-center mt-3">
                        <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;