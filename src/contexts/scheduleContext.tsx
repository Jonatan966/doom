import {
  useContext,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react'
import dayjs from 'dayjs'

import { Schedule, Trigger } from '../@types/schedule'
import { database } from '../services/dexie'
import { usePlayer } from './playerContext'

interface ScheduleProviderProps {
  children: ReactNode
}

export interface FormattedSchedule extends Schedule {
  triggers?: Omit<Trigger, 'scheduleId'>[]
}

interface ScheduleContextProps {
  addSchedule: (scheduleData: FormattedSchedule) => Promise<boolean>
  loadSchedulesByDate: (targetDate: Date) => Promise<FormattedSchedule[]>
  removeSchedule: (scheduleId: number) => Promise<boolean>
}

export const ScheduleContext = createContext({} as ScheduleContextProps)

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const { playSound, currentSound } = usePlayer()
  const [, setIsExecutingSchedule] = useState(false)

  async function loadSchedulesByDate(
    targetDate: Date
  ): Promise<FormattedSchedule[]> {
    const findedOtherSchedules = await database.schedules
      .filter(schedule => {
        switch (schedule.mode) {
          case 'monthly':
            return (
              schedule.targetDate === dayjs(targetDate).get('date').toString()
            )
          case 'annually':
            return schedule.targetDate === dayjs(targetDate).format('MM-DD')
          case 'only-once':
            return (
              schedule.targetDate === dayjs(targetDate).format('YYYY-MM-DD')
            )
          default:
            return false
        }
      })
      .toArray()

    const findedDailySchedules = await database.schedules
      .filter(schedule => schedule.mode === 'daily')
      .toArray()

    const findedTriggers = await database.triggers
      .filter(trigger => trigger.weekDay === targetDate.getDay())
      .filter(trigger =>
        findedDailySchedules.some(
          dailySchedule => dailySchedule.id === trigger.scheduleId
        )
      )
      .toArray()

    const dailySchedulesWithTriggers = findedDailySchedules
      .map(schedule => ({
        ...schedule,
        triggers: findedTriggers.filter(
          trigger => trigger?.scheduleId === schedule.id
        ) as Trigger[],
      }))
      .filter(dailySchedule => !!dailySchedule.triggers.length)

    return [...findedOtherSchedules, ...dailySchedulesWithTriggers]
  }

  async function addSchedule({ triggers, ...schedule }: FormattedSchedule) {
    try {
      if (schedule.mode === 'daily' && !triggers) {
        throw new Error('argumentos inválidos')
      }

      const scheduleResult = await database.schedules.add({
        ...schedule,
        reproductions: schedule.reproductions < 1 ? 1 : schedule.reproductions,
      })

      if (schedule.mode === 'daily') {
        const mappedTriggers = triggers!.map(trigger => ({
          ...trigger,
          scheduleId: scheduleResult,
        }))

        await database.triggers.bulkAdd(mappedTriggers)
      }

      return true
    } catch {
      return false
    }
  }

  async function removeSchedule(scheduleId: number) {
    const findedSchedule = await database.schedules.get(scheduleId)

    if (!findedSchedule) {
      return false
    }

    await database.schedules.delete(scheduleId)

    if (findedSchedule.mode === 'daily') {
      await database.triggers.bulkDelete(
        await database.triggers
          .filter(trigger => trigger.scheduleId === findedSchedule.id)
          .keys()
      )
    }

    return true
  }

  const checkIsExecutingSchedule = () =>
    new Promise(resolve => {
      setIsExecutingSchedule(old => {
        resolve(old)
        return old
      })
    })

  useEffect(() => {
    async function checkSchedules() {
      if (await checkIsExecutingSchedule()) return

      const currentDatetime = dayjs()
      const currentTime = currentDatetime.format('HH:mm')

      const currentSchedules = await loadSchedulesByDate(
        currentDatetime.toDate()
      )

      const targetSchedule = currentSchedules.find(
        schedule => schedule.targetTime === currentTime
      )

      if (!targetSchedule) {
        return
      }

      playSound({
        ...targetSchedule.sound,
        reproductions: targetSchedule.reproductions,
      })

      setIsExecutingSchedule(true)

      if (targetSchedule.mode === 'only-once') {
        await database.schedules.delete(targetSchedule.id || -1)
      }
    }

    const intervalId = setInterval(checkSchedules, 1000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!currentSound) {
      setIsExecutingSchedule(false)
    }
  }, [currentSound])

  // async function updateSchedule() {}

  return (
    <ScheduleContext.Provider
      value={{ addSchedule, loadSchedulesByDate, removeSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  )
}

export const useSchedule = () => useContext(ScheduleContext)
