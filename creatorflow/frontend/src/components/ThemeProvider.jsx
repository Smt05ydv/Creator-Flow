import {ThemeProvider as NexTThemeProvider} from  'next-themes';

const ThemeProvider= ({children}) =>{
    return(
        <NexTThemeProvider
        attribute="class"
        defaultTheme= 'light'
        enableSystem= {false}

        >
            {children}
        </NexTThemeProvider>
    )
};

export default ThemeProvider;