'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { Download } from 'lucide-react';

export function QRCodeGenerator({ url, title }: { url: string, title?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy URL");
        }
    };

    const downloadQRCode = () => {
        const svg = document.getElementById("resume-qr-code");
        if (!svg) return;
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = `QR_${title || "Resume"}.png`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border">
            <h3 className="font-semibold text-center text-black">Scan to View Resume</h3>
            <div className="bg-white p-2 rounded-xl">
                <QRCodeSVG
                    id="resume-qr-code"
                    value={url}
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                />
            </div>

            <div className="flex gap-2 w-full mt-2">
                <button
                    onClick={handleCopy}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                    {copied ? "Copied!" : "Copy Link"}
                </button>
                <button
                    onClick={downloadQRCode}
                    className="flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
                >
                    <Download className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
