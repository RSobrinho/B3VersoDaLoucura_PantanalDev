export interface INewsEntityProps {
  _id?: string
  title?: string
  description?: string
  sentiment?: {
    positive?: number
    neutral?: number
    negative?: number
  }
}
