export interface Trigger {
  id?: number
  weekDay: string
  time: string
  scheduleId: number
}

export interface Schedule {
  id?: number
  mode: 'only-once' | 'daily' | 'monthly' | 'annualy'
  sound: string
  reproductions: number
  targetDate: string
  targetTime: string
}
