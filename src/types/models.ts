// src/app/shared/types/app.types.ts

// --- Enums ---
export enum RoleName {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export enum NotificationTypes {
  NEW_USER = 'NEW_USER',
  NEW_EXPENSE = 'NEW_EXPENSE',
  NEW_INCOME = 'NEW_INCOME',
  NEW_TRANSFER = 'NEW_TRANSFER',
  TRANSFER_SUCCESS = 'TRANSFER_SUCCESS',
  TRANSFER_FAIL = 'TRANSFER_FAIL',
}

export enum Action {
  READ = 'READ',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum Resource {
  USER = 'USER',
  PERMISSION = 'PERMISSION',
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
  EXPENSE_TYPE = 'EXPENSE_TYPE',
  INCOME_TYPE = 'INCOME_TYPE',
  NOTIFICATION = 'NOTIFICATION',
}

// --- Basic Information Types (for nested relationships) ---
export interface UserBasicInfo {
  id: number;
  email: string;
  role_id: number;
}

// --- User Types ---
export interface User {
  id: number;
  email: string;
  // password: string; // Typically you wouldn't send passwords to the frontend after login
  created_at: Date;
  role_id: number;
  role?: Role; // Optional, if you often include the full role object
  deleted: boolean;
}

export interface CreateUserDto {
  email: string;
  password: string;
  role_id: number;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  role_id?: number;
  deleted?: boolean;
}

export interface UserWithRole extends User {
  role: Role;
}

// --- Role & Permissions Types ---
export interface Role {
  id: number;
  name: RoleName;
  permissions?: Permission[]; // Optional, if you often include permissions
  users?: UserBasicInfo[]; // Optional, if you often include users with role
  deleted: boolean;
}

export interface Permission {
  id: number;
  roleId: number;
  resource: Resource;
  actions: Action[];
}

export interface CreateRoleDto {
  name: RoleName;
}

export interface UpdateRoleDto {
  name?: RoleName;
  deleted?: boolean;
}

export interface AssignPermissionsDto {
  roleId: number;
  permissions: {
    resource: Resource;
    actions: Action[];
  }[];
}

// --- Expense Types ---
export interface Expense {
  id: number;
  name: string;
  expense_type_id: number;
  amount: number; // Use number for float
  created_at: Date;
  updated_at: Date;
  user_id: number;
  expenseType?: ExpenseType; // Optional, if often included
  user?: UserBasicInfo; // Optional, if often included
  deleted: boolean;
}

export interface ExpenseType {
  id: number;
  name: string;
  expenses?: Expense[]; // Optional, if you include related expenses
  deleted: boolean;
}

export interface CreateExpenseDto {
  name: string;
  expense_type_id: number;
  amount: number;
  user_id: number;
}

export interface UpdateExpenseDto {
  name?: string;
  expense_type_id?: number;
  amount?: number;
  deleted?: boolean;
}

export interface CreateExpenseTypeDto {
  name: string;
}

export interface UpdateExpenseTypeDto {
  name?: string;
  deleted?: boolean;
}

// --- Income Types ---
export interface Income {
  id: number;
  name: string;
  income_type_id: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  incomeType?: IncomeType;
  user?: UserBasicInfo;
  deleted: boolean;
}

export interface IncomeType {
  id: number;
  name: string;
  income?: Income[]; // Optional, if you include related income
  deleted: boolean;
}

export interface CreateIncomeDto {
  name: string;
  income_type_id: number;
  amount: number;
  user_id: number;
}

export interface UpdateIncomeDto {
  name?: string;
  income_type_id?: number;
  amount?: number;
  deleted?: boolean;
}

export interface CreateIncomeTypeDto {
  name: string;
}

export interface UpdateIncomeTypeDto {
  name?: string;
  deleted?: boolean;
}

// --- Transfer Types ---
export interface Transfer {
  id: number;
  description?: string; // Optional field
  sender_id: number;
  recipient_id: number;
  amount: number;
  created_at: Date;
  sender?: UserBasicInfo; // Optional, if often included
  recipient?: UserBasicInfo; // Optional, if often included
  deleted: boolean;
}

export interface CreateTransferDto {
  description?: string;
  sender_id: number;
  recipient_id: number;
  amount: number;
}

export interface UpdateTransferDto {
  description?: string;
  sender_id?: number;
  recipient_id?: number;
  amount?: number;
  deleted?: boolean;
}

// --- Notification Types ---
export interface Notification {
  id: number;
  description?: string;
  type: NotificationTypes;
  created_at: Date;
  user_id: number;
  user?: UserBasicInfo; // Optional, if often included
  deleted: boolean;
}

export interface CreateNotificationDto {
  description?: string;
  type: NotificationTypes;
  user_id: number;
}

export interface UpdateNotificationDto {
  description?: string;
  type?: NotificationTypes;
  deleted?: boolean;
}
