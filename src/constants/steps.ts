export const steps: Step[] = [
  {
    stepIndex: 1,
    action: 'Select Category',
    description: 'Lorem ipsum dolor sit amet consectetur. Quisque molestie suspendisse aliquet fringilla hendrerit ac id. '
  },
  {
    stepIndex: 2,
    action: 'Select Documents',
    description: 'Lorem ipsum dolor sit amet consectetur. Quisque molestie suspendisse aliquet fringilla hendrerit ac id. '
  },
  {
    stepIndex: 3,
    action: 'Fill Form',
    description: 'Lorem ipsum dolor sit amet consectetur. Quisque molestie suspendisse aliquet fringilla hendrerit ac id. '
  },
  {
    stepIndex: 4,
    action: 'Download / Get Document',
    description: 'Lorem ipsum dolor sit amet consectetur. Quisque molestie suspendisse aliquet fringilla hendrerit ac id. '
  }
]


export type Step = {
  stepIndex: number,
  action: string,
  description: string
}