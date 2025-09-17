import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, QrCode, Flashlight, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const QRScannerPage = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanComplete = (result: string) => {
    setScanResult(result);
    setIsScanning(false);
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  // Simulate QR code detection
  const simulateScan = () => {
    setTimeout(() => {
      handleScanComplete("Welcome to Riverfront Park! You've discovered the Historic Bridge viewpoint. Learn about the bridge's role in connecting Daytona Beach communities since 1928.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <Link to="/parks" className="p-2 bg-black/50 rounded-full">
          <ArrowLeft size={24} className="text-white" />
        </Link>
        <h1 className="text-white font-bold-accent text-center flex-1 mx-4">
          Scan QR Code
        </h1>
        <button 
          onClick={() => setFlashOn(!flashOn)}
          className={`p-2 rounded-full ${flashOn ? 'bg-yellow-500/30' : 'bg-black/50'}`}
        >
          <Flashlight size={24} className="text-white" />
        </button>
      </div>

      {/* Camera View Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
        {isScanning && (
          <>
            {/* Scanning frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Scanning area */}
                <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
                  {/* Corner indicators */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                  
                  {/* Animated scanning line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-32 left-4 right-4 text-center">
              <div className="bg-black/70 rounded-lg p-4">
                <QrCode size={32} className="text-white mx-auto mb-2" />
                <p className="text-white text-sm mb-2">
                  Point your camera at a QR code
                </p>
                <p className="text-white/70 text-xs">
                  Look for QR codes on park signs and information boards
                </p>
              </div>
            </div>
          </>
        )}

        {/* Scan Result */}
        {scanResult && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              
              <h3 className="font-bold text-lg mb-3 text-gray-900">
                QR Code Detected!
              </h3>
              
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {scanResult}
              </p>
              
              <div className="space-y-3">
                <Button className="w-full">
                  Learn More
                </Button>
                <Button variant="outline" onClick={resetScanner} className="w-full">
                  <RotateCcw size={16} className="mr-2" />
                  Scan Another
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="flex justify-center space-x-4">
          {isScanning && (
            <Button 
              onClick={simulateScan}
              size="lg" 
              className="bg-primary hover:bg-primary/90"
            >
              <QrCode size={20} className="mr-2" />
              Simulate Scan
            </Button>
          )}
        </div>
        
        <p className="text-white/70 text-center text-xs mt-4">
          Find QR codes throughout the park to unlock exclusive content
        </p>
      </div>
    </div>
  );
};

export default QRScannerPage;