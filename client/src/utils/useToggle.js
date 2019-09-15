import {
    useState
} from "react";

export function useToggle(initialState) {
    const [on, setOnState] = useState(initialState);
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