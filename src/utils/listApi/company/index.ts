import { department } from "@/utils/listApi/company/department";
import { area } from "@/utils/listApi/company/area";
import { position } from "@/utils/listApi/company/position";
import { leaveType } from "@/utils/listApi/company/leaveType";
import { employee } from "@/utils/listApi/company/employee";
import { workshop } from "@/utils/listApi/company/workshop";
import { shift } from "./shift";
import { reimbursement } from "./reimbursement";
import { salaries } from "./salary";
export const company = {
    department,
    area,
    position,
    leaveType,
    employee,
    workshop,
    shift,
    reimbursement,
    salaries,
}