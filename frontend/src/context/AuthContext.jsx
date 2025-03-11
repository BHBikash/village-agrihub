import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined); // Start with undefined

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            console.log("Stored User from LocalStorage:", storedUser);

            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                console.log("Parsed User:", parsedUser);
                setUser(parsedUser);
            } else {
                setUser(null); // Explicitly set to null if no user is stored
            }
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            setUser(null);
        }
    }, []);

    const login = (userData) => {
        console.log("Logging in:", userData);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        console.log("Logging out");
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ Create and export useAuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
};
