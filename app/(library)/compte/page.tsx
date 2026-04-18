"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, LogOut, ShoppingBag, BookOpen, History, Settings, Loader2 } from "lucide-react"
import { formatPriceFull } from "@/lib/currency"

interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  country: "france" | "benin"
}

interface OrderHistory {
  id: string
  date: string
  total: number
  status: "en_attente" | "paye" | "livre"
  items: { title: string; quantity: number }[]
}

export default function ComptePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [user, setUser] = useState<UserData | null>(null)
  const [orders, setOrders] = useState<OrderHistory[]>([])
  
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Verifier si l'utilisateur est connecte
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
      
      // Charger l'historique des commandes (simulation)
      const savedOrders = localStorage.getItem("userOrders")
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders))
      } else {
        // Donnees de demonstration
        setOrders([
          {
            id: "ORD-001",
            date: "2024-02-20",
            total: 30.00,
            status: "livre",
            items: [{ title: "La vie victorieuse", quantity: 1 }]
          },
          {
            id: "ORD-002",
            date: "2024-02-25",
            total: 63.00,
            status: "paye",
            items: [{ title: "Le couple selon Dieu", quantity: 2 }]
          }
        ])
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    // Simulation de connexion
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Pour la demo, accepter n'importe quel email/mot de passe
    const userData: UserData = {
      id: "1",
      firstName: "Jean",
      lastName: "Dupont",
      email: loginForm.email,
      phone: "+33 6 12 34 56 78",
      address: "15 Rue de la Paix, 75001 Paris",
      country: "france"
    }
    
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    setIsLoggedIn(true)
    setIsSubmitting(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsSubmitting(false)
      return
    }
    
    if (registerForm.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caracteres")
      setIsSubmitting(false)
      return
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const userData: UserData = {
      id: Date.now().toString(),
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      phone: registerForm.phone,
      address: "",
      country: "france"
    }
    
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
    setIsLoggedIn(true)
    setIsSubmitting(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsLoggedIn(false)
    setOrders([])
  }

  const getStatusBadge = (status: OrderHistory["status"]) => {
    switch (status) {
      case "en_attente":
        return <Badge variant="destructive">En attente</Badge>
      case "paye":
        return <Badge className="bg-secondary text-secondary-foreground">Paye</Badge>
      case "livre":
        return <Badge className="bg-primary text-primary-foreground">Livre</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
      </div>
    )
  }

  // Affichage connecte
  if (isLoggedIn && user) {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold">Mon Compte</h1>
                <p className="text-muted-foreground">
                  Bienvenue, {user.firstName} {user.lastName}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Deconnexion
              </Button>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profil</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Commandes</span>
                </TabsTrigger>
                <TabsTrigger value="ebooks" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">E-books</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Mes informations
                    </CardTitle>
                    <CardDescription>
                      Gerez vos informations personnelles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <User className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Nom complet</p>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Mail className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Phone className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Telephone</p>
                          <p className="font-medium">{user.phone || "Non renseigne"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <MapPin className="h-5 w-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm text-muted-foreground">Adresse</p>
                          <p className="font-medium">{user.address || "Non renseignee"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      Historique des commandes
                    </CardTitle>
                    <CardDescription>
                      Consultez vos commandes passees
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">{order.id}</p>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric"
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {order.items.map(item => `${item.title} x${item.quantity}`).join(", ")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">{formatPriceFull(order.total).fcfa}</p>
                              <p className="text-xs text-muted-foreground">{formatPriceFull(order.total).eur}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">Aucune commande pour le moment</p>
                        <Button className="mt-4" asChild>
                          <Link href="/livres">Voir les livres</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ebooks">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Mes e-books
                    </CardTitle>
                    <CardDescription>
                      Acces a vos e-books achetes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">Aucun e-book achete</p>
                      <Button className="mt-4" asChild>
                        <Link href="/ebooks">Voir les e-books</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  // Affichage non connecte (Login/Register)
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Mon Compte</CardTitle>
              <CardDescription>
                Connectez-vous ou creez un compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Inscription</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword">Mot de passe</Label>
                      <Input
                        id="loginPassword"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        placeholder="Votre mot de passe"
                        required
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Connexion...
                        </>
                      ) : (
                        "Se connecter"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="regFirstName">Prenom</Label>
                        <Input
                          id="regFirstName"
                          value={registerForm.firstName}
                          onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                          placeholder="Prenom"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="regLastName">Nom</Label>
                        <Input
                          id="regLastName"
                          value={registerForm.lastName}
                          onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                          placeholder="Nom"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regEmail">Email</Label>
                      <Input
                        id="regEmail"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regPhone">Telephone</Label>
                      <Input
                        id="regPhone"
                        type="tel"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regPassword">Mot de passe</Label>
                      <Input
                        id="regPassword"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        placeholder="Minimum 6 caracteres"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regConfirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="regConfirmPassword"
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        placeholder="Confirmez votre mot de passe"
                        required
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Inscription...
                        </>
                      ) : (
                        "Creer mon compte"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-xs text-muted-foreground text-center">
                En vous inscrivant, vous acceptez nos conditions generales
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
