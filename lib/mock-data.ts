import type { Podcast, Video, Ebook, PhysicalBook, Order, SiteSettings, UpcomingProgram, HeroSlide } from './types'

export const mockPodcasts: Podcast[] = [
  {
    id: '1',
    title: 'La puissance de la foi',
    description: 'Un enseignement profond sur comment developper une foi inebranrlable dans les moments difficiles.',
    speaker: 'Pasteur Jean-Marc',
    date: '2024-01-15',
    duration: '45:30',
    audioUrl: '/audio/podcast-1.mp3',
    theme: 'foi',
    coverImage: '/images/podcast-1.jpg'
  },
  {
    id: '2',
    title: 'Temoignage de guerison miraculeuse',
    description: 'Marie partage son temoignage extraordinaire de guerison apres des annees de maladie.',
    speaker: 'Soeur Marie',
    date: '2024-01-20',
    duration: '32:15',
    audioUrl: '/audio/podcast-2.mp3',
    theme: 'temoignage',
    coverImage: '/images/podcast-2.jpg'
  },
  {
    id: '3',
    title: 'La delivrance par la priere',
    description: 'Comprendre les principes bibliques de la delivrance et comment prier efficacement.',
    speaker: 'Pasteur Paul',
    date: '2024-02-01',
    duration: '58:45',
    audioUrl: '/audio/podcast-3.mp3',
    theme: 'delivrance',
    coverImage: '/images/podcast-3.jpg'
  },
  {
    id: '4',
    title: 'Comment prier sans cesse',
    description: 'Les secrets dune vie de priere constante et efficace.',
    speaker: 'Pasteur Jean-Marc',
    date: '2024-02-10',
    duration: '41:20',
    audioUrl: '/audio/podcast-4.mp3',
    theme: 'priere',
    coverImage: '/images/podcast-4.jpg'
  }
]

export const mockVideos: Video[] = [
  // MSI - 2 videos
  {
    id: '1',
    title: 'MSI - La puissance de la Parole',
    description: 'Enseignement MSI sur la puissance transformatrice de la Parole de Dieu dans nos vies.',
    speaker: 'Pasteur Jean-Marc',
    date: '2024-01-10',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-1.jpg',
    category: 'msi'
  },
  {
    id: '2',
    title: 'MSI - Formation des disciples',
    description: 'Session MSI sur le discipulat et la croissance spirituelle.',
    speaker: 'Equipe pastorale',
    date: '2024-02-20',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-2.jpg',
    category: 'msi'
  },
  // Jeudi Midi - 2 videos
  {
    id: '3',
    title: 'Jeudi Midi - Moment de priere et meditation',
    description: 'Retrouvez notre culte du jeudi midi pour un moment de ressourcement spirituel.',
    speaker: 'Pasteur Paul',
    date: '2024-01-25',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-3.jpg',
    category: 'jeudi_midi'
  },
  {
    id: '4',
    title: 'Jeudi Midi - Intercession pour les nations',
    description: 'Moment de priere intercession pour les nations du monde.',
    speaker: 'Pasteur Paul',
    date: '2024-02-22',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-4.jpg',
    category: 'jeudi_midi'
  },
  // Culte du Mercredi - 2 videos
  {
    id: '5',
    title: 'Culte du Mercredi - La foi qui deplace les montagnes',
    description: 'Predication du mercredi sur la foi et la confiance en Dieu.',
    speaker: 'Pasteur Jean-Marc',
    date: '2024-02-05',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-5.jpg',
    category: 'culte_mercredi'
  },
  {
    id: '6',
    title: 'Culte du Mercredi - La grace de Dieu',
    description: 'Message sur la grace incommensurable de Dieu et comment la recevoir.',
    speaker: 'Pasteur Paul',
    date: '2024-02-12',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-6.jpg',
    category: 'culte_mercredi'
  },
  // Culte du Dimanche - 2 videos
  {
    id: '7',
    title: 'Culte du Dimanche - Vivre dans la victoire',
    description: 'Message dominical sur la vie de victoire en Christ Jesus.',
    speaker: 'Pasteur Jean-Marc',
    date: '2024-02-15',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-7.jpg',
    category: 'culte_dimanche'
  },
  {
    id: '8',
    title: 'Culte du Dimanche - Le reveil spirituel',
    description: 'Predication dominicale sur le reveil spirituel et la consecration.',
    speaker: 'Pasteur Jean-Marc',
    date: '2024-02-25',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/images/video-8.jpg',
    category: 'culte_dimanche'
  }
]

export const mockEbooks: Ebook[] = [
  {
    id: '1',
    title: 'Marcher par la foi',
    description: 'Un guide pratique pour developper une foi solide et vivre selon les promesses de Dieu.',
    author: 'Pasteur Jean-Marc',
    coverImage: '/images/ebook-1.jpg',
    price: 0,
    isFree: true,
    pdfUrl: '/ebooks/marcher-par-la-foi.pdf'
  },
  {
    id: '2',
    title: 'Les secrets de la priere efficace',
    description: 'Decouvrez les cles pour une vie de priere transformatrice.',
    author: 'Pasteur Paul',
    coverImage: '/images/ebook-2.jpg',
    price: 9.99,
    isFree: false
  },
  {
    id: '3',
    title: 'Guerison divine - Guide biblique',
    description: 'Comprendre la guerison divine a travers les Ecritures.',
    author: 'Pasteur Jean-Marc',
    coverImage: '/images/ebook-3.jpg',
    price: 14.99,
    isFree: false
  }
]

export const mockPhysicalBooks: PhysicalBook[] = [
  {
    id: '1',
    title: 'La vie victorieuse',
    description: 'Comment vivre une vie de victoire dans tous les domaines. Ce livre vous guidera a travers les principes bibliques de la victoire.',
    author: 'Pasteur Jean-Marc',
    coverImage: '/images/book-1.jpg',
    price: 25.00,
    stock: 50
  },
  {
    id: '2',
    title: 'Le couple selon Dieu',
    description: 'Un manuel complet pour construire un mariage solide base sur la Parole de Dieu.',
    author: 'Pasteur Jean-Marc et son epouse',
    coverImage: '/images/book-2.jpg',
    price: 30.00,
    stock: 35
  },
  {
    id: '3',
    title: 'Devenir un leader efficace',
    description: 'Principes et pratiques du leadership chretien pour impacter votre generation.',
    author: 'Pasteur Paul',
    coverImage: '/images/book-3.jpg',
    price: 22.00,
    stock: 40
  }
]

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    userName: 'Pierre Dupont',
    userEmail: 'pierre@email.com',
    userPhone: '+33 6 12 34 56 78',
    address: '15 Rue de la Paix, 75001 Paris',
    country: 'france',
    items: [
      { bookId: '1', bookTitle: 'La vie victorieuse', quantity: 1, price: 25.00 }
    ],
    totalAmount: 25.00,
    shippingFee: 5.00,
    status: 'en_attente',
    createdAt: '2024-02-20T10:30:00Z'
  },
  {
    id: 'ORD-002',
    userId: '2',
    userName: 'Marie Adjovi',
    userEmail: 'marie@email.com',
    userPhone: '+229 97 12 34 56',
    address: 'Quartier Zongo, Cotonou',
    country: 'benin',
    items: [
      { bookId: '2', bookTitle: 'Le couple selon Dieu', quantity: 2, price: 30.00 }
    ],
    totalAmount: 60.00,
    shippingFee: 3.00,
    status: 'paye',
    receiptUrl: '/receipts/receipt-002.jpg',
    createdAt: '2024-02-18T14:45:00Z'
  },
  {
    id: 'ORD-003',
    userId: '3',
    userName: 'Jean Kokou',
    userEmail: 'jean@email.com',
    userPhone: '+229 95 98 76 54',
    address: 'Akpakpa, Cotonou',
    country: 'benin',
    items: [
      { bookId: '1', bookTitle: 'La vie victorieuse', quantity: 1, price: 25.00 },
      { bookId: '3', bookTitle: 'Devenir un leader efficace', quantity: 1, price: 22.00 }
    ],
    totalAmount: 47.00,
    shippingFee: 3.00,
    status: 'livre',
    receiptUrl: '/receipts/receipt-003.pdf',
    createdAt: '2024-02-15T09:15:00Z'
  }
]

export const mockSiteSettings: SiteSettings = {
  logoUrl: '/images/logo-ccr.png',
  siteName: 'Centre Chretien de Reveil',
  contactEmail: 'contact@ccr-eglise.com',
  contactPhone: '+229 97 00 00 00',
  bankAccounts: [
    {
      bankName: 'BGFI Bank',
      accountName: 'Centre Chretien de Reveil',
      accountNumber: 'BJ 0001 0001 0001 0001 0001',
      iban: 'BJ62 0001 0001 0001 0001 0001 001'
    }
  ],
  mobileMoney: [
    { provider: 'wave', number: '+229 97 00 00 01', name: 'CCR Librairie' },
    { provider: 'orange_money', number: '+229 97 00 00 02', name: 'CCR Librairie' },
    { provider: 'moov', number: '+229 97 00 00 03', name: 'CCR Librairie' }
  ]
}

// Frais de livraison par pays (en EUR pour compatibilite interne)
// France: 8 EUR = ~5248 FCFA, Benin: 3 EUR = ~1968 FCFA
export const shippingFees = {
  france: 8.00,
  benin: 3.00
}

// Frais de livraison en FCFA (pour affichage)
export const shippingFeesFCFA = {
  france: 5248,
  benin: 2000
}

// Programmes a venir
export const mockUpcomingPrograms: UpcomingProgram[] = [
  {
    id: '1',
    title: 'Conference de Reveillage Spirituel',
    description: 'Trois jours de consecration intense pour raviver la flamme de Dieu en vous. Venez vivre une experience transformatrice avec des predicateurs oint de Dieu.',
    date: '2024-03-15',
    time: '18:00',
    location: 'Temple Principal CCR, Cotonou',
    image: '/images/conference-1.jpg',
    speaker: 'Pasteur Jean-Marc',
    category: 'conference'
  },
  {
    id: '2',
    title: 'Seminaire sur le Mariage Chretien',
    description: 'Un seminaire pratique pour les couples maries et ceux qui se preparent au mariage. Decouvrez les cles bibliques pour un mariage epanoui.',
    date: '2024-03-22',
    time: '09:00',
    location: 'Salle Polyvalente CCR',
    image: '/images/seminaire-mariage.jpg',
    speaker: 'Pasteur et Maman Jean-Marc',
    category: 'seminaire'
  },
  {
    id: '3',
    title: 'Nuit de Priere et Louange',
    description: 'Une nuit entiere dediee a la priere et a la louange. Venez experimenter la presence de Dieu et recevoir votre miracle.',
    date: '2024-03-29',
    time: '21:00',
    location: 'Temple Principal CCR',
    image: '/images/nuit-priere.jpg',
    category: 'culte'
  },
  {
    id: '4',
    title: 'Camp de Jeunesse 2024',
    description: 'Un week-end inoubliable pour les jeunes de 15 a 30 ans. Enseignements, activites sportives, louange et communion fraternelle.',
    date: '2024-04-05',
    time: '08:00',
    location: 'Centre de vacances, Grand-Popo',
    image: '/images/camp-jeunesse.jpg',
    speaker: 'Equipe Pastorale Jeunesse',
    category: 'jeunesse'
  },
  {
    id: '5',
    title: 'Campagne d\'Evangelisation',
    description: 'Grande campagne d\'evangelisation dans les quartiers de Cotonou. Rejoignez-nous pour annoncer la bonne nouvelle.',
    date: '2024-04-12',
    time: '16:00',
    location: 'Place de l\'Etoile Rouge, Cotonou',
    image: '/images/evangelisation.jpg',
    speaker: 'Pasteur Paul',
    category: 'evangelisation'
  }
]

// Slides Hero Section
export const mockHeroSlides: HeroSlide[] = [
  {
    id: '1',
    title: 'Bienvenue dans notre Librairie Spirituelle',
    subtitle: 'Centre Chretien de Reveil',
    description: 'Decouvrez des enseignements, temoignages et ressources chretiennes pour votre edification spirituelle. Podcasts, videos, e-books et livres physiques disponibles a tout moment.',
    image: '/images/hero-1.jpg',
    buttonText: 'Explorer les podcasts',
    buttonLink: '/podcasts',
    isActive: true
  },
  {
    id: '2',
    title: 'Nourrissez votre Foi',
    subtitle: 'Des ressources pour grandir',
    description: 'Accedez a une collection riche de livres, podcasts et videos pour approfondir votre relation avec Dieu et renforcer votre foi au quotidien.',
    image: '/images/hero-2.jpg',
    buttonText: 'Voir les livres',
    buttonLink: '/livres',
    isActive: true
  },
  {
    id: '3',
    title: 'Enseignements Video',
    subtitle: 'Apprenez a votre rythme',
    description: 'Des predications et formations video de qualite par nos pasteurs pour vous accompagner dans votre marche spirituelle.',
    image: '/images/hero-3.jpg',
    buttonText: 'Regarder les videos',
    buttonLink: '/videos',
    isActive: true
  }
]

// Categories des programmes
export const programCategories = [
  { value: 'culte', label: 'Culte' },
  { value: 'conference', label: 'Conference' },
  { value: 'seminaire', label: 'Seminaire' },
  { value: 'evangelisation', label: 'Evangelisation' },
  { value: 'jeunesse', label: 'Jeunesse' },
  { value: 'autre', label: 'Autre' }
] as const

// Themes des podcasts
export const podcastThemes = [
  { value: 'foi', label: 'Foi' },
  { value: 'delivrance', label: 'Delivrance' },
  { value: 'temoignage', label: 'Temoignage' },
  { value: 'priere', label: 'Priere' }
] as const

// Categories des videos
export const videoCategories = [
  { value: 'msi', label: 'MSI' },
  { value: 'jeudi_midi', label: 'Jeudi Midi' },
  { value: 'culte_mercredi', label: 'Culte du Mercredi' },
  { value: 'culte_dimanche', label: 'Culte du Dimanche' }
] as const
