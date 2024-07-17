import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@/assets/styles/font.css";
import { ThemeProvider } from "./providers/theme-providers.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ReduxProvider from "./providers/redux-provider.tsx";
import ErrorPage from "./pages/others/error-page.tsx";
import Loader from "./components/ui/loader.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={ErrorPage}>
    <ReduxProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="h-[100vh] grid place-content-center">
                <Loader/>
              </div>
            }
          >
            <App />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  </ErrorBoundary>
);
