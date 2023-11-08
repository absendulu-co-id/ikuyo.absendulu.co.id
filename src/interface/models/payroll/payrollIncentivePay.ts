export interface payrollIncentivePay {
  id: number;
  templateId: number;
  employeeId: number;
  incentiveType: string;
  amount: number;
  date: Date;
}
