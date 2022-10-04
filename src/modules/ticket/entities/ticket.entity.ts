export class Ticket {
  id?: number
  type: string
  barCode: string
  qrCode: string
  price: number
  eventId: number | null
  batchId: number | null
  createdAt?: Date
  updatedAt?: Date
}