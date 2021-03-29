export function round(value: number) {
  return Math.round(value * 100) / 100
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const dataKeys = [
  'Chest',
  'Waist',
  'Shoulders',
  'Neck',
  'Biceps',
  'Forearm',
  'Hips',
  'Thigh',
  'Calf',
]

export interface FormData {
  'Distance unit': string
  'Weight unit': string
  Wrist: string
  Sex: string
  Height: string
  Ankle: string
  Weight: string
  Chest: string
  Neck: string
  Biceps: string
  Forearm: string
  Hips: string
  Waist: string
  Thigh: string
  Calf: string
  [key: string]: string
}

export interface Measurement {
  change: FormData
  current: FormData
  ideal: FormData
  timestamp: {
    nanoseconds: number
    seconds: number
  }
}

const GOLDEN_RATIO = 1.618

export const formulas: {
  [key: string]: (data: FormData) => number
} = {
  Chest(data) {
    return parseFloat(data?.Wrist) * 6.5
  },
  Neck(data) {
    return parseFloat(data?.Chest) * 0.37
  },
  Biceps(data) {
    return parseFloat(data?.Chest) * 0.36
  },
  Forearm(data) {
    return parseFloat(data?.Chest) * 0.29
  },
  Hips(data) {
    return parseFloat(data?.Chest) * 0.85
  },
  Waist(data) {
    return parseFloat(data?.Chest) * 0.7
  },
  Thigh(data) {
    return parseFloat(data?.Chest) * 0.53
  },
  Calf(data) {
    return parseFloat(data?.Chest) * 0.34
  },
  Shoulders(data) {
    return parseFloat(data?.Waist) * GOLDEN_RATIO
  },
}

export const defaultData: FormData = {
  'Distance unit': 'cm',
  'Weight unit': 'kg',
  Height: '172',
  Wrist: '17',
  Ankle: '',
  Weight: '71',
  Chest: '101',
  Neck: '38',
  Biceps: '32',
  Forearm: '28',
  Hips: '100',
  Waist: '84',
  Thigh: '60',
  Calf: '38',
  Sex: 'Male',
}
