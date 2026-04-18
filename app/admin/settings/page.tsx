"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockSiteSettings, shippingFees } from "@/lib/mock-data"
import type { SiteSettings } from "@/lib/types"
import { Settings, Save, Plus, Trash2 } from "lucide-react"

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(mockSiteSettings)
  const [fees, setFees] = useState(shippingFees)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simuler une sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Parametres sauvegardes avec succes !")
  }

  const addBankAccount = () => {
    setSettings({
      ...settings,
      bankAccounts: [
        ...settings.bankAccounts,
        { bankName: "", accountName: "", accountNumber: "", iban: "" }
      ]
    })
  }

  const removeBankAccount = (index: number) => {
    setSettings({
      ...settings,
      bankAccounts: settings.bankAccounts.filter((_, i) => i !== index)
    })
  }

  const updateBankAccount = (index: number, field: string, value: string) => {
    const newAccounts = [...settings.bankAccounts]
    newAccounts[index] = { ...newAccounts[index], [field]: value }
    setSettings({ ...settings, bankAccounts: newAccounts })
  }

  const addMobileMoney = () => {
    setSettings({
      ...settings,
      mobileMoney: [
        ...settings.mobileMoney,
        { provider: "wave", number: "", name: "" }
      ]
    })
  }

  const removeMobileMoney = (index: number) => {
    setSettings({
      ...settings,
      mobileMoney: settings.mobileMoney.filter((_, i) => i !== index)
    })
  }

  const updateMobileMoney = (index: number, field: string, value: string) => {
    const newMobile = [...settings.mobileMoney]
    newMobile[index] = { ...newMobile[index], [field]: value }
    setSettings({ ...settings, mobileMoney: newMobile })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Parametres</h1>
          <p className="text-muted-foreground">
            Configurez les informations de votre site
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Informations generales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Informations generales
            </CardTitle>
            <CardDescription>
              Les informations de base de votre site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nom du site</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logoUrl">URL du logo</Label>
                <Input
                  id="logoUrl"
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                  placeholder="/images/logo.png"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de contact</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Telephone de contact</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Frais de livraison */}
        <Card>
          <CardHeader>
            <CardTitle>Frais de livraison</CardTitle>
            <CardDescription>
              Configurez les frais de livraison par pays
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="feeFrance">France (EUR)</Label>
                <Input
                  id="feeFrance"
                  type="number"
                  step="0.01"
                  min="0"
                  value={fees.france}
                  onChange={(e) => setFees({...fees, france: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feeBenin">Benin (EUR)</Label>
                <Input
                  id="feeBenin"
                  type="number"
                  step="0.01"
                  min="0"
                  value={fees.benin}
                  onChange={(e) => setFees({...fees, benin: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comptes bancaires */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Comptes bancaires</CardTitle>
                <CardDescription>
                  Les comptes pour recevoir les paiements
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addBankAccount}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings.bankAccounts.map((account, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Compte {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBankAccount(index)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nom de la banque</Label>
                    <Input
                      value={account.bankName}
                      onChange={(e) => updateBankAccount(index, 'bankName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom du compte</Label>
                    <Input
                      value={account.accountName}
                      onChange={(e) => updateBankAccount(index, 'accountName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Numero de compte</Label>
                    <Input
                      value={account.accountNumber}
                      onChange={(e) => updateBankAccount(index, 'accountNumber', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>IBAN (optionnel)</Label>
                    <Input
                      value={account.iban || ''}
                      onChange={(e) => updateBankAccount(index, 'iban', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mobile Money */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mobile Money</CardTitle>
                <CardDescription>
                  Les numeros Mobile Money pour les paiements
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={addMobileMoney}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {settings.mobileMoney.map((mobile, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {mobile.provider === 'wave' ? 'Wave' : 
                     mobile.provider === 'orange_money' ? 'Orange Money' : 'Moov Money'}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeMobileMoney(index)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Operateur</Label>
                    <select
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={mobile.provider}
                      onChange={(e) => updateMobileMoney(index, 'provider', e.target.value)}
                    >
                      <option value="wave">Wave</option>
                      <option value="orange_money">Orange Money</option>
                      <option value="moov">Moov Money</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Numero</Label>
                    <Input
                      value={mobile.number}
                      onChange={(e) => updateMobileMoney(index, 'number', e.target.value)}
                      placeholder="+229 97 00 00 00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom du compte</Label>
                    <Input
                      value={mobile.name}
                      onChange={(e) => updateMobileMoney(index, 'name', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
