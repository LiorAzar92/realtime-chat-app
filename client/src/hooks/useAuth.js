import { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function useAuth() {
    return useContext(AppContext);
}
