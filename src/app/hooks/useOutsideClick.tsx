import { useEffect } from "react";

export function useOutsideClick(ref: any, handler: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) {
                handler();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handler, ref]);
}

export function useOutsideClickId(id: string, handler: () => void) {
    useEffect(() => {
        const element = document.getElementById(id);

        function handleClickOutside(event: MouseEvent) {
            const other: any = event.target;
            console.log(other);
            if (element && !element.contains(other)) {
                handler();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handler, id]);
}