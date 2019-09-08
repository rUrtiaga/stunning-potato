import {
    useState
} from "react";

export function useToggle() {
    const [on, setOnState] = useState(false);
    const toggle = () => setOnState(o => !o);
    const setHide = () => setOnState(true);
    const setVisible = () => setOnState(false);
    return {
        on,
        toggle,
        setHide,
        setVisible
    };
}