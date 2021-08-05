import { CurrentSound } from './currentSound'

export interface Trigger {
  id?: number
  weekDay: number
  time: string
  scheduleId: number
}

export interface Schedule {
  id?: number
  mode: 'only-once' | 'daily' | 'monthly' | 'annually'
  sound: CurrentSound
  reproductions: number
  targetDate: string
  targetTime?: string
}
