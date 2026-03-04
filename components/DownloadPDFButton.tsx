'use client'

import { Download, Loader2 } from 'lucide-react'
import { useState } from 'react'

const generatePDF = async (elementId: string, filename: string) => {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById(elementId)

    if (!element) return

    const opt = {
        margin: [10, 10, 10, 10],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    await html2pdf().set(opt).from(element).save()
}

export default function DownloadPDFButton({ targetId, filename }: { targetId: string, filename: string }) {
    const [isDownloading, setIsDownloading] = useState(false)

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            await generatePDF(targetId, filename)
        } catch (err) {
            console.error(err)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-500/30 disabled:opacity-70"
        >
            {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
        </button>
    )
}
