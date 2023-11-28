export interface PhotoData {
    uid: string
    id: string
    public_id: string
    secure_url: string
    url: string
    asset_id: string
    created_at: Date
    deleted_at?: Date
    deleted: boolean
    public: boolean
    public_last_date?: Date
    gallery_id: string
    file_name: string
    order: number
    description?: string    
  }

  export interface Price {
    quantity: number
    percentage: number
    bonificationAmount: number
    subTotal: number
    total: number
    dollar: number
    date: Date
  }

  export interface PublicSetting {
    total: number
    per_page: number
    dollar: number
    isRealDelete: boolean
  }

  export interface GalleryData {
    uid: string
    id: string
    total?: number
    name: string
    order?: number
    created_at: Date
    deleted?: boolean
    deleted_at?: boolean
    visible: boolean
    personal_id?: string
    for_sale: boolean
    description?: string
  }

  export interface PersonalData {
    uid: string
    id: string
    gallery_id: string
    title: string
    description: string
    enabled: boolean
    security: boolean
    password: string
    error?: string
  }

  export interface PaginatorData {
    indexFrom: number
    indexTo: number
  }
