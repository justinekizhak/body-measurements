import { isEmpty, last } from 'lodash'
import firebase from 'firebase'

export type Sex = 'Male' | 'Female'

export function round(value: number) {
  return Math.round(value * 100) / 100
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const displayMaleKeys = [
  'Shoulders',
  'Chest',
  'Biceps',
  'Forearm',
  'Waist',
  // 'Neck',
  'Hips',
  'Thigh',
  'Calf',
]

export const dataKeys = [
  'Chest',
  'Waist',
  'Shoulders',
  // 'Neck',
  'Biceps',
  'Forearm',
  'Hips',
  'Thigh',
  'Calf',
]

export function calculationKeys(
  sex: Sex = 'Male',
  displayKeys: boolean = false
) {
  if (sex === 'Male') {
    if (displayKeys) {
      return displayMaleKeys
    }
    return dataKeys
  }
  return ['Waist', 'Shoulders', 'Hips']
}

export const upperKeys = [
  //
  'Chest',
  'Shoulders',
  'Waist',
]

export const limbKeys = [
  //
  'Biceps',
  'Forearm',
]

export const lowerKeys = [
  //
  'Hips',
  'Thigh',
  'Calf',
]

type YesNo = 'Yes' | 'No'

export interface FormData {
  'Leg length': string
  Wrist: string
  Sex: Sex
  'Distance unit': 'cm' | 'inch'
  // 'Weight unit': 'kg' | 'pound'
  Height: string
  'Rough estimate?': YesNo
  'Jump the gun?': YesNo
  // Weight: string
  Waist: string
  Shoulders: string
  Hips: string
  Biceps: string
  Forearm: string
  Thigh: string
  Calf: string
  Chest: string
  // Neck: string
  [key: string]: string
}
export interface Measurement {
  change: FormData
  current: FormData
  ideal: FormData
  timestamp: firebase.firestore.Timestamp
}

const GOLDEN_RATIO = 1.618

// const legLength = '108cm'

interface Formulas {
  [key: string]: (data: FormData) => number
}

export function formulas(sex: Sex = 'Male'): Formulas {
  const isFemale = sex === 'Female'
  return {
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
      if (isFemale) {
        return parseFloat(data?.Waist) * 1.42
      }
      return parseFloat(data?.Chest) * 0.85
    },
    Waist(data) {
      if (isFemale) {
        return parseFloat(data?.Height) * 0.382
      }
      return parseFloat(data?.Chest) * 0.7
    },
    Thigh(data) {
      return parseFloat(data?.Chest) * 0.53
    },
    Calf(data) {
      return parseFloat(data?.Chest) * 0.34
    },
    Shoulders(data) {
      if (isFemale) {
        return parseFloat(data?.Waist) * GOLDEN_RATIO
      }
      return parseFloat(data?.Waist) * GOLDEN_RATIO
    },
  }
}

// export const defaultData: FormData = {
//   'Distance unit': 'cm',
//   'Weight unit': 'kg',
//   Height: '172',
//   Wrist: '17',
//   Ankle: '21',
//   Shoulders: '115',
//   Weight: '71',
//   Chest: '101',
//   Neck: '38',
//   Biceps: '32',
//   Forearm: '28',
//   Hips: '100',
//   Waist: '84',
//   Thigh: '60',
//   Calf: '38',
//   Sex: 'Male',
// }

export interface GraphSeries {
  name: string
  type: string
  smooth: boolean
  stack?: string | boolean
  areaStyle?: boolean
  emphasis: {
    focus: string
  }
  lineStyle: {
    type: string
  }
  data: number[]
}

export function generateGraphSeries(
  fullData: Measurement[],
  bodyParts: string[]
): GraphSeries[] {
  const output: GraphSeries[] = []
  if (isEmpty(fullData)) {
    return output
  }
  for (const i of bodyParts) {
    const current = generateObject(i)
    if (current) {
      output.push(current)
    }
    const ideal = generateObject(i, 'ideal')
    if (ideal) {
      output.push(ideal)
    }
  }
  return output

  function generateObject(key: string, type: string = 'current') {
    const output: GraphSeries = {
      name: type === 'current' ? key : `Ideal ${key}`,
      type: 'line',
      smooth: true,
      // stack: key,
      emphasis: {
        focus: 'series',
      },
      lineStyle: {
        type: type === 'current' ? 'solid' : 'dashed',
      },
      data: [],
    }
    if (type === 'current') {
      output.areaStyle = true
    }
    // if (isEmpty(fullData)) {
    //   return output
    // }
    for (const i of fullData) {
      if (type === 'current') {
        const t = parseFloat(i.current[key]) || 0
        // if (t !== 0) {
        output.data.push(t)
        // }
      } else {
        // const currentV = parseFloat(i.current[key]) || 0
        const idealV = parseFloat(i.ideal[key]) || 0
        // const differenceV = round(idealV - currentV)
        // if (differenceV !== 0) {
        // output.data.push(differenceV)
        // }
        output.data.push(idealV)
      }
    }
    if (isEmpty(output.data)) {
      return null
    }
    return output
  }
}

interface CellObject {
  text: string
  class: string
}

export type Cell = string | CellObject

export type Row = Cell[]

export type Table = Row[]

export function getChange(
  idealMeasurements: FormData,
  currentMeasurements: FormData,
  key: string
) {
  const d =
    parseFloat(idealMeasurements[key]) - parseFloat(currentMeasurements[key])

  return round(d)
}

export function generateTable(
  idealMeasurements: FormData | undefined,
  currentMeasurements: FormData | undefined,
  changes: FormData | undefined,
  keys: string[] = [],
  margin: number = 5
): Table {
  if (!idealMeasurements || !currentMeasurements || !changes) {
    return []
  }
  const getValue = (
    key: string,
    data: FormData = idealMeasurements
  ): string => {
    if (isNaN(parseFloat(data[key])) || data[key] === 'NaN') {
      return '-'
    }
    const distanceUnit = currentMeasurements['Distance unit']
    return data[key] && data[key] !== '0' ? `${data[key]} ${distanceUnit}` : '-'
  }
  const withinMargin = (key: string): boolean => {
    const value = getChange(idealMeasurements, currentMeasurements, key)
    if (isNaN(value)) {
      return true
    }
    const d = Math.abs(value)
    const idealV = idealMeasurements[key]
    const calculatedMargin = (margin / 100) * parseFloat(idealV)
    if (d > calculatedMargin) {
      return false
    }
    return true
  }
  const d: Table = []
  if (!keys.length) {
    return d
  }
  const head = [
    'Body Part',
    'Ideal Measurement',
    'Current Measurement',
    'Change',
  ]
  d.push(head)
  for (const i of keys) {
    const t = []
    t.push(i)
    t.push(getValue(i))
    t.push(getValue(i, currentMeasurements))
    const _class = () => {
      if (changes[i] === '-') {
        return 'text-gray-400'
      }
      return withinMargin(i) ? 'text-blue-400' : 'text-red-500'
    }
    t.push({
      text: changes[i],
      class: _class(),
    })
    d.push(t)
  }
  return d
}

export function getTime(timestamp: firebase.firestore.Timestamp) {
  const options = {
    year: 'numeric',
    month: 'long',
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const t = timestamp.toDate()
  // @ts-ignore
  const t2 = t.toLocaleString(undefined, options)
  return t2
}

export function generateTable2Data(
  measurements: Measurement[],
  distanceUnit: string = 'cm'
): Table {
  const output = []
  const current = last(measurements)?.current
  const metadataKeys = ['Timestamp']
  const dataKeys = calculationKeys(current?.Sex, true)
  const keys = [...metadataKeys, ...dataKeys]

  output.push(keys)
  for (const i of measurements) {
    output.push(getRowData(i))
  }
  return output

  function getRowData(data: Measurement): Row {
    const output = []
    output.push(getTime(data.timestamp))
    for (const i of dataKeys) {
      output.push(`${data.current[i]} ${distanceUnit}`)
    }
    return output
  }
}
