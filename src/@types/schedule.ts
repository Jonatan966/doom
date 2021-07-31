export interface Trigger {
  id?: number
  weekDay: number
  time: string
  scheduleId: number
}

export interface Schedule {
  id?: number
  mode: 'only-once' | 'daily' | 'monthly' | 'annualy'
  sound: string
  reproductions: number
  targetDate: string
  targetTime?: string
}
