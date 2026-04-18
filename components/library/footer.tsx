import Link from "next/link"
import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">CCR</span>
              </div>
              <div>
                <p className="font-bold leading-tight">Centre Chrétien</p>
                <p className="text-xs text-sidebar-foreground/70">de Réveil</p>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/70 leading-relaxed">
              Évangéliser à travers des contenus spirituels de qualité. 
              Enseignements, témoignages et ressources pour votre édification.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Librairie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/podcasts" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                  Podcasts
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                  Enseignements Vidéo
                </Link>
              </li>
              <li>
                <Link href="/ebooks" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                  E-books
                </Link>
              </li>
              <li>
                <Link href="/livres" className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
                  Livres physiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@ccr-eglise.com" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                  contact@ccr-eglise.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+22997000000" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                  +229 97 00 00 00
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sidebar-foreground/70">
                  Cotonou, Bénin
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Zones de livraison</h4>
              <div className="flex gap-2 text-sm text-sidebar-foreground/70">
                <span>France</span>
                <span>|</span>
                <span>Bénin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-sidebar-border mt-8 pt-6 text-center text-sm text-sidebar-foreground/50">
          <p>
            &copy; {new Date().getFullYear()} Centre Chrétien de Réveil. Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  )
}