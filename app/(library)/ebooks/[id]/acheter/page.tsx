"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockEbooks, mockSiteSettings } from "@/lib/mock-data"
import type { Ebook } from "@/lib/types"
import { ArrowLeft, BookOpen, Upload, CheckCircle, AlertCircle, Smartphone, Building, Copy, FileCheck, Loader2, Mail, Download } from "lucide-react"
import { formatPriceFull } from "@/lib/currency"

export default function AcheterEbookPage() {
  const router = useRouter()
  const params = useParams()
  const ebookId = params.id as string
  
  const [ebook, setEbook] = useState<Ebook | null>(null)
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"form" | "payment" | "success">("form")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string>("")

  useEffect(() => {
    const foundEbook = mockEbooks.find(e => e.id === ebookId)
    if (foundEbook) {
      setEbook(foundEbook)
      // Si l'ebook est gratuit, rediriger vers le telechargement
      if (foundEbook.isFree && foundEbook.pdfUrl) {
        router.push(foundEbook.pdfUrl)
      }
    }
  }, [ebookId, router])

  if (!ebook) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">E-book non trouve</h1>
        <p className="text-muted-foreground mb-6">
          Cet e-book n&apos;existe pas ou n&apos;est plus disponible.
        </p>
        <Button asChild>
          <Link href="/ebooks">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux e-books
          </Link>
        </Button>
      </div>
    )
  }

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const newOrderId = `EBOOK-${Date.now()}`
    setOrderId(newOrderId)
    
    // Sauvegarder la commande
    const orderData = {
      id: newOrderId,
      type: "ebook",
      item: {
        id: ebook.id,
        title: ebook.title,
        price: ebook.price,
      },
      total: ebook.price,
      email,
      status: "en_attente",
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem("pendingEbookOrder", JSON.stringify(orderData))
    
    setStep("payment")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        alert("Format non supporte. Veuillez uploader un fichier JPG, PNG ou PDF.")
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert("Le fichier est trop volumineux. Taille maximum: 5MB")
        return
      }

      setUploadedFile(file)
      
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreviewUrl(null)
      }
    }
  }

  const handleUploadReceipt = async () => {
    if (!uploadedFile) return
    
    setIsUploading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsUploading(false)
    setStep("success")
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // Etape de succes
  if (step === "success") {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto text-center">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Paiement soumis</CardTitle>
            <CardDescription>
              Votre recu de paiement a ete envoye pour verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Commande: {orderId}</p>
              <p className="text-muted-foreground">
                Une fois le paiement verifie, vous recevrez l&apos;e-book par email a l&apos;adresse{" "}
                <strong>{email}</strong>
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 p-4 border rounded-lg">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="text-left">
                <p className="font-semibold">{ebook.title}</p>
                <p className="text-sm text-muted-foreground">{ebook.author}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Delai de verification: 24 a 48 heures ouvrables
            </p>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button className="w-full" asChild>
              <Link href="/">
                Retour a l&apos;accueil
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/ebooks">
                Voir plus d&apos;e-books
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Etape de paiement
  if (step === "payment") {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <Button variant="ghost" className="mb-6" onClick={() => setStep("form")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Commande {orderId}</CardTitle>
                <CardDescription>
                  {ebook.title} - {formatPriceFull(ebook.price).fcfa}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Instructions de paiement */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Instructions de paiement</CardTitle>
                  <CardDescription>
                    Effectuez votre paiement via l&apos;un des moyens suivants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="mobile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="mobile" className="gap-2">
                        <Smartphone className="h-4 w-4" />
                        Mobile Money
                      </TabsTrigger>
                      <TabsTrigger value="bank" className="gap-2">
                        <Building className="h-4 w-4" />
                        Virement
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="mobile" className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        Envoyez <strong>{formatPriceFull(ebook.price).fcfa}</strong> via Mobile Money:
                      </p>
                      {mockSiteSettings.mobileMoney.map((mobile, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary">
                              {mobile.provider === "wave" ? "Wave" : 
                               mobile.provider === "orange_money" ? "Orange Money" : "Moov Money"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Numero</p>
                              <p className="font-mono">{mobile.number}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(mobile.number, `mobile-${index}`)}
                            >
                              {copiedField === `mobile-${index}` ? (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Nom: {mobile.name}
                          </p>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="bank" className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        Effectuez un virement de <strong>{formatPriceFull(ebook.price).fcfa}</strong>:
                      </p>
                      {mockSiteSettings.bankAccounts.map((account, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <p className="font-semibold text-primary">{account.bankName}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-muted-foreground">Titulaire: </span>
                                <span>{account.accountName}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(account.accountName, `name-${index}`)}
                              >
                                {copiedField === `name-${index}` ? (
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-muted-foreground">Numero: </span>
                                <span className="font-mono">{account.accountNumber}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(account.accountNumber, `account-${index}`)}
                              >
                                {copiedField === `account-${index}` ? (
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 bg-secondary/20 rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Important:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>- Reference: <strong>{orderId}</strong></li>
                      <li>- Conservez votre recu de paiement</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Upload du recu */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-primary" />
                    Envoyer le recu
                  </CardTitle>
                  <CardDescription>
                    Uploadez votre recu apres le paiement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="receipt">Fichier (JPG, PNG ou PDF)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Input
                        id="receipt"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="receipt" className="cursor-pointer">
                        {uploadedFile ? (
                          <div className="space-y-2">
                            {previewUrl ? (
                              <img 
                                src={previewUrl} 
                                alt="Apercu" 
                                className="max-h-32 mx-auto rounded-lg"
                              />
                            ) : (
                              <div className="w-12 h-12 mx-auto bg-muted rounded-lg flex items-center justify-center">
                                <FileCheck className="h-6 w-6 text-primary" />
                              </div>
                            )}
                            <p className="text-sm font-medium">{uploadedFile.name}</p>
                            <Button variant="outline" size="sm" type="button">
                              Changer
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                            <p className="font-medium">Cliquez pour uploader</p>
                            <p className="text-xs text-muted-foreground">
                              JPG, PNG, PDF (max 5MB)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <Button 
                    onClick={handleUploadReceipt}
                    disabled={!uploadedFile || isUploading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Envoyer le recu
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-sm">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-muted-foreground">
                      L&apos;e-book sera envoye a: <strong>{email}</strong>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Formulaire initial
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/ebooks">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux e-books
          </Link>
        </Button>

        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-12 w-12 text-muted-foreground/30" />
              </div>
              <CardTitle>{ebook.title}</CardTitle>
              <CardDescription>{ebook.author}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground text-center">
                {ebook.description}
              </p>

              <div className="flex flex-col items-center justify-center gap-1 py-4 border-y">
                <span className="text-2xl font-bold text-primary">
                  {formatPriceFull(ebook.price).fcfa}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatPriceFull(ebook.price).eur} - Format PDF
                </span>
              </div>

              <form onSubmit={handleSubmitEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Votre adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    L&apos;e-book sera envoye a cette adresse apres validation du paiement
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Proceder au paiement
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-xs text-muted-foreground text-center">
                En achetant, vous acceptez nos conditions generales de vente
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
