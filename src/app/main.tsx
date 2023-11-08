import React from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/app/context";
import { Snackbar } from "@/app/components";
import { RecoilRoot } from "recoil";
import "../../public/css/tailwind.css";
import { Provider } from "react-redux";
import store from "@/redux/Store"; 
import { DataProvider } from "./context/DataContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <>
    <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <DataProvider>
              <MaterialTailwindControllerProvider>
                <RecoilRoot>
                  <App />
                  <Snackbar />
                </RecoilRoot>
              </MaterialTailwindControllerProvider>
            </DataProvider>
          </ThemeProvider>
        </BrowserRouter>
    </Provider>
  </>
)
