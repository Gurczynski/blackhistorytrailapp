import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import ServicesPage from "./pages/ServicesPage";
import AllServicesPage from "./pages/AllServicesPage";
import ParksARPage from "./pages/ParksARPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/parks" element={<ParksARPage />} />
          <Route path="/*" element={
            <MobileLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/more" element={<AllServicesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MobileLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
