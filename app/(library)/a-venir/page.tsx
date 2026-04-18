"use client"

import { useState, useEffect, useCallback } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Church,
  Users,
  BookOpen,
  Megaphone,
  Heart,
  Star
} from "lucide-react"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  culte: Church,
  conference: Megaphone,
  seminaire: BookOpen,
  evangelisation: Heart,
  jeunesse: Users,
  autre: Star
}

const categoryLabels: Record<string, string> = {
  culte: "Culte",
  conference: "Conference",
  seminaire: "Seminaire",
  evangelisation: "Evangelisation",
  jeunesse: "Jeunesse",
  autre: "Autre"
}

const categoryColors: Record<string, string> = {
  culte: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  conference: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  seminaire: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  evangelisation: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  jeunesse: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  autre: "bg-gray-500/10 text-gray-600 border-gray-500/20"
}

export default function UpcomingProgramsPage() {
  const { upcomingPrograms } = useStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Sort programs by date
  const sortedPrograms = [...upcomingPrograms].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sortedPrograms.length)
  }, [sortedPrograms.length])
  
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sortedPrograms.length) % sortedPrograms.length)
  }, [sortedPrograms.length])
  
  // Auto-slide every 10 seconds
  useEffect(() => {
    if (!isAutoPlaying || sortedPrograms.length <= 1) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 10000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide, sortedPrograms.length])
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  
  if (sortedPrograms.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Church className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Aucun programme a venir</h1>
          <p className="text-muted-foreground">
            Revenez bientot pour decouvrir nos prochains evenements.
          </p>
        </div>
      </div>
    )
  }
  
  const currentProgram = sortedPrograms[currentSlide]
  const CategoryIcon = categoryIcons[currentProgram.category]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[150px] rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 py-12 lg:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-background/60 border border-border shadow-sm backdrop-blur-md text-muted-foreground mb-6">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium tracking-wide">Programmes a Venir</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Evenements du <span className="text-primary">Centre Chretien de Reveil</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Decouvrez nos prochains cultes, conferences, seminaires et autres evenements spirituels.
            </p>
          </div>
          
          {/* Main Slider */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Card className="overflow-hidden border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative h-[300px] lg:h-[500px] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
                      style={{ 
                        backgroundImage: `url(${currentProgram.image || '/images/placeholder-event.jpg'})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "px-4 py-2 text-sm font-medium backdrop-blur-sm",
                          categoryColors[currentProgram.category]
                        )}
                      >
                        <CategoryIcon className="h-4 w-4 mr-2" />
                        {categoryLabels[currentProgram.category]}
                      </Badge>
                    </div>
                    
                    {/* Slide Counter */}
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-sm font-medium opacity-80">
                        {currentSlide + 1} / {sortedPrograms.length}
                      </p>
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      {/* Title */}
                      <h2 className="text-2xl lg:text-3xl font-bold leading-tight">
                        {currentProgram.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {currentProgram.description}
                      </p>
                      
                      {/* Meta Information */}
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-3 text-foreground">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium capitalize">{formatDate(currentProgram.date)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-foreground">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Heure</p>
                            <p className="font-medium">{currentProgram.time}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 text-foreground">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Lieu</p>
                            <p className="font-medium">{currentProgram.location}</p>
                          </div>
                        </div>
                        
                        {currentProgram.speaker && (
                          <div className="flex items-center gap-3 text-foreground">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Orateur</p>
                              <p className="font-medium">{currentProgram.speaker}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Navigation Buttons */}
            {sortedPrograms.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border-border hover:bg-background z-10"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border-border hover:bg-background z-10"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
          
          {/* Slide Indicators */}
          {sortedPrograms.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {sortedPrograms.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentSlide 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* All Programs Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Tous les programmes a venir</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPrograms.map((program, index) => {
              const ProgramIcon = categoryIcons[program.category]
              return (
                <Card 
                  key={program.id}
                  className={cn(
                    "overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                    index === currentSlide && "ring-2 ring-primary"
                  )}
                  onClick={() => setCurrentSlide(index)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ 
                        backgroundImage: `url(${program.image || '/images/placeholder-event.jpg'})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "absolute top-4 left-4 backdrop-blur-sm",
                        categoryColors[program.category]
                      )}
                    >
                      <ProgramIcon className="h-3 w-3 mr-1" />
                      {categoryLabels[program.category]}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {program.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="capitalize">{formatDate(program.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{program.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{program.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
