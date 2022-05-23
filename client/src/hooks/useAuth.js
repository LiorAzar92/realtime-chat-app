import { useContext } from "react";
import AppContext from "../src/contexts/AuthContext";

export default function useAuth() {
    return useContext(AppContext);
}
