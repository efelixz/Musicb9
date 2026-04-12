import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Voicify - Sua Identidade Vocal',
  description: 'Crie músicas com sua própria voz usando IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
