"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"
import { Mic, Video, BookOpen, Book, ShoppingCart, TrendingUp, Bell, ArrowUpRight, ArrowDownRight, Package } from "lucide-react"
import { formatPriceFull } from "@/lib/currency"
import Link from "next/link"

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  const { podcasts, videos, ebooks, physicalBooks, orders, notifications } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2" />
          <div className="h-4 bg-muted rounded w-64" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const pendingOrders = orders.filter(o => o.status === 'en_attente').length
  const paidOrders = orders.filter(o => o.status === 'paye').length
  const deliveredOrders = orders.filter(o => o.status === 'livre').length
  const unreadNotifications = notifications.filter(n => !n.read).length
  
  const totalRevenue = orders
    .filter(o => o.status !== 'en_attente')
    .reduce((acc, order) => acc + order.totalAmount + order.shippingFee, 0)

  const totalContent = podcasts.length + videos.length + ebooks.length + physicalBooks.length
  const totalOrders = orders.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue dans votre espace d&apos;administration
          </p>
        </div>
        {unreadNotifications > 0 && (
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2.5 rounded-full">
            <Bell className="h-4 w-4" />
            <span className="text-sm font-medium">{unreadNotifications} notification(s)</span>
          </div>
        )}
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/10 via-card to-card">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Revenus totaux</CardDescription>
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{formatPriceFull(totalRevenue).fcfa}</div>
            <p className="text-xs text-muted-foreground mt-1">{formatPriceFull(totalRevenue).eur}</p>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-muted-foreground">ce mois</span>
            </div>
          </CardContent>
        </Card>

        {/* Orders Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Commandes</CardDescription>
              <div className="p-2 rounded-lg bg-secondary/20">
                <ShoppingCart className="h-4 w-4 text-secondary-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">{pendingOrders} en attente</p>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="text-muted-foreground">ce mois</span>
            </div>
          </CardContent>
        </Card>

        {/* Content Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Contenus</CardDescription>
              <div className="p-2 rounded-lg bg-primary/10">
                <Package className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{totalContent}</div>
            <p className="text-xs text-muted-foreground mt-1">podcasts, videos, livres</p>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">+3</span>
              <span className="text-muted-foreground">cette semaine</span>
            </div>
          </CardContent>
        </Card>

        {/* Delivered Card */}
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-sm font-medium">Livraisons</CardDescription>
              <div className="p-2 rounded-lg bg-green-500/10">
                <Package className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{deliveredOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">commandes livrees</p>
            <div className="flex items-center gap-1 mt-3 text-xs">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              <span className="text-green-500 font-medium">100%</span>
              <span className="text-muted-foreground">taux de livraison</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/podcasts" className="group">
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Podcasts</p>
                  <p className="text-xl font-bold">{podcasts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/videos" className="group">
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                  <Video className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Videos</p>
                  <p className="text-xl font-bold">{videos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/ebooks" className="group">
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">E-books</p>
                  <p className="text-xl font-bold">{ebooks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/books" className="group">
          <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                  <Book className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Livres</p>
                  <p className="text-xl font-bold">{physicalBooks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Commandes recentes</CardTitle>
                <CardDescription>Les dernieres commandes recues</CardDescription>
              </div>
              <Link href="/admin/orders" className="text-sm text-primary hover:underline">
                Voir tout
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground text-sm mt-2">Aucune commande</p>
                </div>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {order.userName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{order.userName}</p>
                        <p className="text-xs text-muted-foreground">{order.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatPriceFull(order.totalAmount + order.shippingFee).fcfa}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full font-medium ${
                        order.status === 'en_attente' 
                          ? 'bg-orange-100 text-orange-700' 
                          : order.status === 'paye' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {order.status === 'en_attente' ? 'En attente' : order.status === 'paye' ? 'Paye' : 'Livre'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Statistics */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div>
              <CardTitle className="text-lg">Statistiques des commandes</CardTitle>
              <CardDescription>Repartition par statut</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span>En attente</span>
                  </div>
                  <span className="font-semibold">{pendingOrders}</span>
                </div>
                <Progress value={totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0} className="h-2 bg-orange-100 [&>div]:bg-orange-500" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Payees</span>
                  </div>
                  <span className="font-semibold">{paidOrders}</span>
                </div>
                <Progress value={totalOrders > 0 ? (paidOrders / totalOrders) * 100 : 0} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Livrees</span>
                  </div>
                  <span className="font-semibold">{deliveredOrders}</span>
                </div>
                <Progress value={totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0} className="h-2 bg-green-100 [&>div]:bg-green-500" />
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-orange-500">{pendingOrders}</p>
                    <p className="text-xs text-muted-foreground">En attente</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-500">{paidOrders}</p>
                    <p className="text-xs text-muted-foreground">Payees</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-500">{deliveredOrders}</p>
                    <p className="text-xs text-muted-foreground">Livrees</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
