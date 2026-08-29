export type TimelineSide = 'br' | 'us'

export const timelineSideLabels: Record<TimelineSide, string> = {
  br: 'Consulados & requerentes',
  us: 'Tribunal & governo EUA',
}

export const timelineSideLabelsShort: Record<TimelineSide, string> = {
  br: 'Consulados',
  us: 'Tribunal EUA',
}
