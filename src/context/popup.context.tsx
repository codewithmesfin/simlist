
import React, { createContext, useContext, useEffect, useState } from "react";
interface PROPS {
    btnText?: string
    title: string
    subtitle?: string
    type?: string
    navigate?: string
}

type PopupContextType = {
    open: boolean;
    popupProps?: PROPS;
    openPopup: ({ title, subtitle, btnText, type, navigate }: PROPS) => PROPS;
};

const PopupContext = createContext<PopupContextType>({
    open: false,
    openPopup: ({ title, subtitle, btnText, type, navigate }: PROPS) => ({ title, subtitle, btnText, type, navigate }),
});

export const usePopup = () => useContext(PopupContext);

type PopupProviderProps = {
    children: React.ReactNode;
};

export const PopupProvider = ({ children }: PopupProviderProps) => {
    const [open, setOpen] = useState(false);
    const [popupProps, setPopupProps] = useState<PROPS>({
        btnText: "",
        title: "",
        subtitle: "",
        type: "", navigate: ""
    });

    const openPopup = ({ title, subtitle, btnText, type, navigate }: PROPS) => {
        setPopupProps({ title, subtitle, btnText, type, navigate });
        setOpen(on => !on);
        return { title, subtitle, btnText, type, navigate };
    };

    const value = { open, popupProps, openPopup };

    return (
        <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
    );
};
