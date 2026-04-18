"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Podcast, Video, Ebook, PhysicalBook, Order, SiteSettings, UpcomingProgram, HeroSlide, ContactMessage } from './types'
import { 
  mockPodcasts, 
  mockVideos, 
  mockEbooks, 
  mockPhysicalBooks, 
  mockOrders, 
  mockSiteSettings,
  shippingFees as defaultShippingFees,
  mockUpcomingPrograms,
  mockHeroSlides
} from './mock-data'

// Admin credentials type
export interface AdminCredentials {
  email: string
  password: string
}

// Notification type
export interface Notification {
  id: string
  type: 'order' | 'payment' | 'info'
  title: string
  message: string
  orderId?: string
  read: boolean
  createdAt: string
}

// Store state type
interface StoreState {
  // Data
  podcasts: Podcast[]
  videos: Video[]
  ebooks: Ebook[]
  physicalBooks: PhysicalBook[]
  orders: Order[]
  siteSettings: SiteSettings
  shippingFees: { france: number; benin: number }
  notifications: Notification[]
  upcomingPrograms: UpcomingProgram[]
  heroSlides: HeroSlide[]
  contactMessages: ContactMessage[]
  
  // Auth
  isAdminAuthenticated: boolean
  adminEmail: string | null
  
  // Podcast actions
  addPodcast: (podcast: Omit<Podcast, 'id'>) => void
  updatePodcast: (id: string, podcast: Partial<Podcast>) => void
  deletePodcast: (id: string) => void
  
  // Video actions
  addVideo: (video: Omit<Video, 'id'>) => void
  updateVideo: (id: string, video: Partial<Video>) => void
  deleteVideo: (id: string) => void
  
  // Ebook actions
  addEbook: (ebook: Omit<Ebook, 'id'>) => void
  updateEbook: (id: string, ebook: Partial<Ebook>) => void
  deleteEbook: (id: string) => void
  
  // Physical Book actions
  addPhysicalBook: (book: Omit<PhysicalBook, 'id'>) => void
  updatePhysicalBook: (id: string, book: Partial<PhysicalBook>) => void
  deletePhysicalBook: (id: string) => void
  updateBookStock: (id: string, quantityChange: number) => void
  
  // Order actions
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string
  updateOrderStatus: (id: string, status: Order['status']) => void
  getOrderById: (id: string) => Order | undefined
  
  // Settings actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => void
  updateShippingFees: (fees: { france?: number; benin?: number }) => void
  
  // Upcoming Program actions
  addUpcomingProgram: (program: Omit<UpcomingProgram, 'id'>) => void
  updateUpcomingProgram: (id: string, program: Partial<UpcomingProgram>) => void
  deleteUpcomingProgram: (id: string) => void
  
  // Hero Slide actions
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void
  updateHeroSlide: (id: string, slide: Partial<HeroSlide>) => void
  deleteHeroSlide: (id: string) => void
  toggleHeroSlideActive: (id: string) => void
  
  // Contact Message actions
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => void
  markContactMessageRead: (id: string) => void
  deleteContactMessage: (id: string) => void
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  clearNotifications: () => void
  getUnreadCount: () => number
  
  // Auth actions
  login: (email: string, password: string) => boolean
  logout: () => void
}

// Default admin credentials (in production, use environment variables and proper auth)
const DEFAULT_ADMIN_EMAIL = 'admin@ccr.com'
const DEFAULT_ADMIN_PASSWORD = 'admin123'

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial data
      podcasts: mockPodcasts,
      videos: mockVideos,
      ebooks: mockEbooks,
      physicalBooks: mockPhysicalBooks,
      orders: mockOrders,
      siteSettings: mockSiteSettings,
      shippingFees: defaultShippingFees,
      notifications: [],
      upcomingPrograms: mockUpcomingPrograms,
      heroSlides: mockHeroSlides,
      contactMessages: [],
      
      // Auth state
      isAdminAuthenticated: false,
      adminEmail: null,
      
      // Podcast actions
      addPodcast: (podcast) => set((state) => ({
        podcasts: [...state.podcasts, { ...podcast, id: Date.now().toString() }]
      })),
      
      updatePodcast: (id, podcast) => set((state) => ({
        podcasts: state.podcasts.map(p => p.id === id ? { ...p, ...podcast } : p)
      })),
      
      deletePodcast: (id) => set((state) => ({
        podcasts: state.podcasts.filter(p => p.id !== id)
      })),
      
      // Video actions
      addVideo: (video) => set((state) => ({
        videos: [...state.videos, { ...video, id: Date.now().toString() }]
      })),
      
      updateVideo: (id, video) => set((state) => ({
        videos: state.videos.map(v => v.id === id ? { ...v, ...video } : v)
      })),
      
      deleteVideo: (id) => set((state) => ({
        videos: state.videos.filter(v => v.id !== id)
      })),
      
      // Ebook actions
      addEbook: (ebook) => set((state) => ({
        ebooks: [...state.ebooks, { ...ebook, id: Date.now().toString() }]
      })),
      
      updateEbook: (id, ebook) => set((state) => ({
        ebooks: state.ebooks.map(e => e.id === id ? { ...e, ...ebook } : e)
      })),
      
      deleteEbook: (id) => set((state) => ({
        ebooks: state.ebooks.filter(e => e.id !== id)
      })),
      
      // Physical Book actions
      addPhysicalBook: (book) => set((state) => ({
        physicalBooks: [...state.physicalBooks, { ...book, id: Date.now().toString() }]
      })),
      
      updatePhysicalBook: (id, book) => set((state) => ({
        physicalBooks: state.physicalBooks.map(b => b.id === id ? { ...b, ...book } : b)
      })),
      
      deletePhysicalBook: (id) => set((state) => ({
        physicalBooks: state.physicalBooks.filter(b => b.id !== id)
      })),
      
      updateBookStock: (id, quantityChange) => set((state) => ({
        physicalBooks: state.physicalBooks.map(b => 
          b.id === id ? { ...b, stock: Math.max(0, b.stock + quantityChange) } : b
        )
      })),
      
      // Order actions
      addOrder: (order) => {
        const id = `ORD-${Date.now()}`
        const newOrder: Order = {
          ...order,
          id,
          createdAt: new Date().toISOString()
        }
        
        set((state) => ({
          orders: [newOrder, ...state.orders]
        }))
        
        // Add notification for admin
        get().addNotification({
          type: 'order',
          title: 'Nouvelle commande',
          message: `Commande ${id} de ${order.userName} - ${order.totalAmount.toFixed(2)} EUR`,
          orderId: id
        })
        
        // Update stock for ordered items
        order.items.forEach(item => {
          get().updateBookStock(item.bookId, -item.quantity)
        })
        
        return id
      },
      
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
        }))
        
        const order = get().orders.find(o => o.id === id)
        if (order) {
          get().addNotification({
            type: 'info',
            title: 'Statut mis a jour',
            message: `Commande ${id} - Statut: ${status === 'en_attente' ? 'En attente' : status === 'paye' ? 'Paye' : 'Livre'}`,
            orderId: id
          })
        }
      },
      
      getOrderById: (id) => get().orders.find(o => o.id === id),
      
      // Settings actions
      updateSiteSettings: (settings) => set((state) => ({
        siteSettings: { ...state.siteSettings, ...settings }
      })),
      
      updateShippingFees: (fees) => set((state) => ({
        shippingFees: { ...state.shippingFees, ...fees }
      })),
      
      // Upcoming Program actions
      addUpcomingProgram: (program) => set((state) => ({
        upcomingPrograms: [...state.upcomingPrograms, { ...program, id: Date.now().toString() }]
      })),
      
      updateUpcomingProgram: (id, program) => set((state) => ({
        upcomingPrograms: state.upcomingPrograms.map(p => p.id === id ? { ...p, ...program } : p)
      })),
      
      deleteUpcomingProgram: (id) => set((state) => ({
        upcomingPrograms: state.upcomingPrograms.filter(p => p.id !== id)
      })),
      
      // Hero Slide actions
      addHeroSlide: (slide) => set((state) => ({
        heroSlides: [...state.heroSlides, { ...slide, id: Date.now().toString() }]
      })),
      
      updateHeroSlide: (id, slide) => set((state) => ({
        heroSlides: state.heroSlides.map(s => s.id === id ? { ...s, ...slide } : s)
      })),
      
      deleteHeroSlide: (id) => set((state) => ({
        heroSlides: state.heroSlides.filter(s => s.id !== id)
      })),
      
      toggleHeroSlideActive: (id) => set((state) => ({
        heroSlides: state.heroSlides.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
      })),
      
      // Contact Message actions
      addContactMessage: (message) => {
        const newMessage: ContactMessage = {
          ...message,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isRead: false
        }
        set((state) => ({
          contactMessages: [newMessage, ...state.contactMessages]
        }))
        get().addNotification({
          type: 'info',
          title: 'Nouveau message',
          message: `Message de ${message.name}: ${message.subject}`
        })
      },
      
      markContactMessageRead: (id) => set((state) => ({
        contactMessages: state.contactMessages.map(m => m.id === id ? { ...m, isRead: true } : m)
      })),
      
      deleteContactMessage: (id) => set((state) => ({
        contactMessages: state.contactMessages.filter(m => m.id !== id)
      })),
      
      // Notification actions
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Date.now().toString(),
            read: false,
            createdAt: new Date().toISOString()
          },
          ...state.notifications
        ]
      })),
      
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),
      
      markAllNotificationsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true }))
      })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      getUnreadCount: () => get().notifications.filter(n => !n.read).length,
      
      // Auth actions
      login: (email, password) => {
        if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
          set({ isAdminAuthenticated: true, adminEmail: email })
          return true
        }
        return false
      },
      
      logout: () => set({ isAdminAuthenticated: false, adminEmail: null })
    }),
    {
      name: 'ccr-library-store',
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        // Version 2 : force la resynchronisation des vidéos mock
        const state = persistedState as Partial<StoreState>
        if (version < 2) {
          // Ancienne version : remplacer complètement les vidéos par les données mock
          return { ...state, videos: mockVideos }
        }
        return state
      },
      merge: (persistedState: unknown, currentState: StoreState): StoreState => {
        const persisted = persistedState as Partial<StoreState>
        // Identifiants des vidéos définies dans mock-data
        const mockIds = new Set(mockVideos.map(v => v.id))
        // Vidéos ajoutées manuellement via le BackOffice (absentes du mock)
        const userAddedVideos = (persisted.videos ?? []).filter(v => !mockIds.has(v.id))
        // Fusion : vidéos mock (toujours à jour) + vidéos ajoutées par l'admin
        const mergedVideos = [...mockVideos, ...userAddedVideos]
        return {
          ...currentState,
          ...persisted,
          videos: mergedVideos,
        }
      },
      partialize: (state) => ({
        podcasts: state.podcasts,
        videos: state.videos,
        ebooks: state.ebooks,
        physicalBooks: state.physicalBooks,
        orders: state.orders,
        siteSettings: state.siteSettings,
        shippingFees: state.shippingFees,
        notifications: state.notifications,
        upcomingPrograms: state.upcomingPrograms,
        heroSlides: state.heroSlides,
        contactMessages: state.contactMessages,
        isAdminAuthenticated: state.isAdminAuthenticated,
        adminEmail: state.adminEmail
      })
    }
  )
)
