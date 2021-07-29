import Dexie from 'dexie'
import { Schedule, Trigger } from '../@types/schedule'

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
