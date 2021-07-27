import Dexie from 'dexie'

interface Trigger {
  id?: number
  weekDay: string
  time: string
  scheduleId: number
}

interface Schedule {
  id?: number
  mode: 'only-once' | 'daily' | 'monthly' | 'annualy'
  sound: string
  reproductions: number
  targetDate: string
  targetTime: string
}

class AppDatabase extends Dexie {
  schedules: Dexie.Table<Schedule, number>
  triggers: Dexie.Table<Trigger, number>

  constructor() {
    super('DOOM')
    this.version(1).stores({
      schedules: '++id,mode,sound,reproductions,targetDate,targetTime',
      triggers: '++id,weekDay,time,scheduleId',
    })

    this.schedules = this.table('schedules')
    this.triggers = this.table('triggers')
  }
}

export const database = new AppDatabase()
