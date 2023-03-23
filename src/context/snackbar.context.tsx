
import React, { createContext, useContext, useEffect, useState } from "react";
interface PROPS {
    btnText?: string
    title: string
    subtitle?: string
    type?: string
}

type SnackbarContextType = {
    open: boolean;
    snackbarProps?: PROPS;
    openSnackbar: ({ title, subtitle, btnText, type }: PROPS) => PROPS;
};

const SnackbarContext = createContext<SnackbarContextType>({
    open: false,
    openSnackbar: ({ title, subtitle, btnText, type }: PROPS) => ({ title, subtitle, btnText, type }),
});

export const useSnackbar = () => useContext(SnackbarContext);

type SnackbarProviderProps = {
    children: React.ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
    const [open, setOpen] = useState(false);
    const [snackbarProps, setSnackbarProps] = useState<PROPS>({
        btnText: "",
        title: "",
        subtitle: "",
        type: ""
    });

    const openSnackbar = ({ title, subtitle, btnText, type }: PROPS) => {
        setSnackbarProps({ title, subtitle, btnText, type });
        setOpen(on => !on);
        return { title, subtitle, btnText, type };
    };

    const value = { open, snackbarProps, openSnackbar };

    return (
        <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>
    );
};
