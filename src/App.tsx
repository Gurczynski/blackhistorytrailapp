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
import SearchResultsPage from "./pages/SearchResultsPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ParkGalleryPage from "./pages/ParkGalleryPage";
import ParkHistoryPage from "./pages/ParkHistoryPage";
import QRScannerPage from "./pages/QRScannerPage";
import ScavengerHuntPage from "./pages/ScavengerHuntPage";
import ParksMapPage from "./pages/ParksMapPage";
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
          <Route path="/parks/gallery" element={<ParkGalleryPage />} />
          <Route path="/parks/history" element={<ParkHistoryPage />} />
          <Route path="/parks/qr" element={<QRScannerPage />} />
          <Route path="/parks/hunt" element={<ScavengerHuntPage />} />
          <Route path="/parks/map" element={<ParksMapPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
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
