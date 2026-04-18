import { Header } from "@/components/library/header"
import { Footer } from "@/components/library/footer"
import { Toaster } from "@/components/ui/toaster"

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
