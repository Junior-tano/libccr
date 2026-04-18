"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Podcast } from "@/lib/types"
import { Download, Share2, Mic } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PodcastCardProps {
  podcast: Podcast
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  const { toast } = useToast()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: podcast.title,
          text: podcast.description,
          url: window.location.href,
        })
      } catch {
        // User cancelled or error
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Lien copie",
        description: "Le lien a ete copie dans le presse-papier",
      })
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 relative">
        {podcast.coverImage ? (
          <Image
            src={podcast.coverImage}
            alt={podcast.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Mic className="h-12 w-12 text-primary/30" />
          </div>
        )}
      </div>
      <CardContent className="p-3 space-y-2">
        <div>
          <h3 className="font-medium text-sm leading-tight line-clamp-1">{podcast.title}</h3>
          <p className="text-xs text-primary">{podcast.speaker}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Button 
            variant="default"
            size="sm"
            className="w-full h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleShare}
          >
            <Share2 className="h-3 w-3 mr-1.5" />
            Partager
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full h-7 text-xs"
            asChild
          >
            <a href={podcast.audioUrl} download>
              <Download className="h-3 w-3 mr-1.5" />
              Telecharger
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
