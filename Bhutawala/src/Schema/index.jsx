import * as Yup from "yup";
export const CategorySchema = Yup.object().shape({
  CategoryName: Yup.string().required("Required")
});
export const TransactionYearSchema = Yup.object().shape({
  YearName: Yup.string().required("Required")
});

export const SalesReturnSchema = Yup.object({
  Paymentmode: Yup.string().min(2).max(25).required("Paymentmode is required"),
  RefNo: Yup.string().min(2).max(25).required("RefNo is required"),
  ReturnDate: Yup.string().min(2).max(25).required("ReturnDate is required"),
  StaffId: Yup.string().min(2).max(25).required("required"),
});


export const MaterialSchema = Yup.object({
  CategoryId: Yup.string().required(" required"),
  Unit: Yup.string().required(" required"),
  Qty: Yup.number()
    .positive("Quantity must be positive")
    .required("required"),
  Net_Qty: Yup.number()
    .positive("Net Quantity must be positive")
    .required(" required"),
  Brand: Yup.string().required("required"),
  GST: Yup.number()
    .min(0, "GST cannot be negative")
    .required(" required"),
  GST_Type: Yup.string().required(" required"),
});

export const SupplierSchema = Yup.object().shape({
  BusinessName: Yup.string().required("Required"),
  ContactPerson: Yup.string().required("Required"),
  ContactNo: Yup.string().matches(/^\d{10}$/, "Must be a valid 10-digit number").required("Required"),
  Address: Yup.string().required("Required"),
  City: Yup.string().required("Required"),
  State: Yup.string().required("Required"),
  PinCode: Yup.string().matches(/^\d{6}$/, "Must be a 6-digit PIN code").required("Required"),
  GSTIN: Yup.string().matches(/^[0-9A-Z]{15}$/, "Must be a valid 15-character GSTIN").required("Required"),
  PAN: Yup.string().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Must be a valid PAN").required("Required"),
  BanckBranch: Yup.string().required("Required"),
  IFSC: Yup.string().matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Must be a valid IFSC code").required("Required"),
  AccountNo: Yup.string().matches(/^\d+$/, "Must be a valid account number").required("Required"),
  BankName: Yup.string().required("Required"),
  Email: Yup.string().email("Must be a valid email").required("Required")
});

export const PurchaseMasterSchema = Yup.object({
  //  SupplierId: Yup.number().nullable().notRequired(),  // Nullable as SupplierId can be null in your model
  //  TransactionYearId: Yup.number().nullable().notRequired(), // Nullable for the same reason
  GrossTotal: Yup.number()
    .required(" required.")
    .min(0, "Gross Total must be non-negative."),
  GST: Yup.number()
    .required(" required.")
    .min(0, "GST  must be non-negative."),
  GST_Type: Yup.string()
    .max(50, "GST Type cannot exceed 50 characters.")
    .nullable(),  // Optional field
  Total: Yup.number()
    .required(" required.")
    .min(0, "Total must be non-negative."),
  PurchaseDate: Yup.date().required(" required."),
  BillNo: Yup.string()
    .max(100, "Bill Number cannot exceed 100 characters.")
    .nullable(),  // Optional field
  NoticePeriod: Yup.date().required(" required."),
  Note: Yup.string()
    .max(200, "Note cannot exceed 200 characters.")
    .nullable(),  // Optional field
});
export const StaffMasterSchema = Yup.object({
  FullName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
    .required(" required"),
  Address: Yup.string().required(" required"),
  ContactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
    .required(" required"),
  Category: Yup.string().required("required"),
  Qualification: Yup.string().required("required"),
  AdharNo: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar number must be 12 digits")
    .required(" required"),
  Age: Yup.number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(18, "Minimum age is 18")
    .max(100, "Maximum age is 100")
    .required("Age is required"),
  Dj: Yup.date().required(" required"),
  Email: Yup.string().email("Invalid email").required("required"),
});
export const InvoiceValidationSchema = Yup.object({
  InvoiceNo: Yup.number()
    .required('required.')
    .integer('Invoice Number must be an integer.'),

  CustomerName: Yup.string()
    .required('required.')
    .max(100, 'Customer Name cannot exceed 100 characters.'),

  ContactNo: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Contact Number.')
    .required('required.'),

  TotalGross: Yup.number()
    .required('required.')
    .min(0, 'Total Gross must be non-negative.'),

  GST: Yup.number()
    .required('required.')
    .min(0, 'GST must be at least 0%.')
    .max(100, 'GST cannot exceed 100%.'),

  GST_TYPE: Yup.string()
    .max(50, 'GST Type cannot exceed 50 characters.')
    .nullable(),

  Total: Yup.number()
    .required('required.')
    .min(0, 'Total must be non-negative.'),

  InvoiceDate: Yup.date()
    .required(' required.')
    .max(new Date(), 'Invoice Date cannot be in the future.'),

  NoticePeriod: Yup.date()
    .max(new Date(), 'Notice Period cannot be in the future.'),

  GSTIN: Yup.string()
    .matches(/^\d{15}$/, 'GSTIN must be exactly 15 characters.')
    .nullable(),

  StaffId: Yup.number().nullable(),
  TransactionYearId: Yup.number().nullable(),
});
export const InwordStockSchema = Yup.object({
  MaterialId: Yup.number().nullable().required(" required."),
  PurchaseId: Yup.number().nullable().required("required."),
  Qty: Yup.number()
    .required("required.")
    .positive("Quantity must be greater than zero.")
    .min(0.01, "Quantity must be greater than zero."),
  Unit: Yup.string()
    .required("Unit is required.")
    .max(50, "Unit cannot exceed 50 characters."),
  Cost: Yup.number()
    .required("Cost is required.")
    .positive("Cost must be greater than zero.")
    .min(0.01, "Cost must be greater than zero."),
  RecivedDate: Yup.date().required("required."),
  Note: Yup.string()
    .max(200, "Note cannot exceed 200 characters.")
    .nullable(),
  StaffId: Yup.number().required(" required."),
});
export const PurchaseReturnSchema = Yup.object().shape({
  // PurchaseId: Yup.number().nullable(), // Can be null
  // InvoiceId: Yup.number().nullable(), // Can be null

  Qty: Yup.number()
    .min(0.01, "Quantity must be greater than zero.")
    .required(" required."),

  Unit: Yup.string()
    .max(50, "Unit cannot exceed 50 characters.")
    .required(" required."),

  Total: Yup.number()
    .min(0.01, "Total must be greater than zero.")
    .required("required."),

  ReturnDate: Yup.date()
    .required(" required.")
});

export const InvoiceDetailSchema = Yup.object().shape({
  Rate: Yup.number()
    .required(" required")
    .min(0, "Rate must be non-negative"),

  Qty: Yup.number()
    .required(" required")
    .min(0, "Quantity must be non-negative"),

  Unit: Yup.string()
    .required(" required")
    .max(50, "Unit cannot exceed 50 characters"),

  GSTAmount: Yup.number()
    .required(" required")
    .min(0, "GST Amount must be non-negative"),

  Total: Yup.number()
    .required("required")
    .min(0, "Total must be non-negative"),
});
export const purchasePaymentSchema = Yup.object({

  // Amount: Yup.number()
  // .required('Amount is required')
  // .required("Amount is required"),

  PaymentMode: Yup.string().required('required'),
  PaymentDate: Yup.date().required(' required'),
});
export const DebitSchema = Yup.object({
  amount: Yup.number()
    .min(0.01, "Amount must be greater than zero")
    .required("required"),
  noteDate: Yup.date().required("required"),
});
export const InvoiceSchema = Yup.object().shape({
  transactionYearId: Yup.string().required("Required"),
  staffId: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  contactNo: Yup.string()
    .required("Required")
    .matches(/^\d{10}$/, "Must be 10 digits"),
  totalGross: Yup.number().required("Required"),
  gst: Yup.number().required("Required"),
  gst_TYPE: Yup.string().required("Required"),
  total: Yup.number().required("Required"),
  invoiceDate: Yup.date().required("Required"),
  gstin: Yup.string().required("Required"),
});
export const ResetPasswordSchema = Yup.object().shape({
  oldPasswd: Yup.string()
    .required("Old password is required"),

  newPasswd: Yup.string()
    .min(6, "Password must be at least 6 characters") // Matches MinLength(6),
    .required("New password is required"),

  Password: Yup.string()
    .oneOf([Yup.ref("newPasswd"), null], "Passwords must match")
    .required("Confirm password is required")
});
export const LogInSchema = Yup.object().shape({
  UserName: Yup.string().required("Required"),
  Password: Yup.string().required("Required")
});
export const ForgetPaswordSchema = Yup.object().shape({
  UserName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed")
    .required("Full Name is required")
});
export const InvoiceMasterSchema = Yup.object().shape({
  InvoiceId: Yup.string().required(" required"),
  StaffId: Yup.string().required(" required"),
  TransactionYearId: Yup.string().required(" required"),
  InvoiceNo: Yup.string().required(" required"),
  CustomerName: Yup.string()
    .min(3, "Customer Name must be at least 3 characters")
    .required(" required"),
  ContactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact Number must be 10 digits")
    .required(" required"),
  TotalGross: Yup.number()
    .positive("Total Gross must be positive")
    .required(" required"),
  GST: Yup.number()
    .min(0, "GST cannot be negative")
    .required(" required"),
  GST_Type: Yup.string()
    .oneOf(["inclusive", "exclusive"], "GST_Type must be 'inclusive' or 'exclusive'")
    .required(" required"),
  Total: Yup.number()
    .positive("Total must be positive")
    .required(" required"),
  InvoiceDate: Yup.date()
    .typeError("Invalid date format")
    .required(" required"),
  NoticePeriod: Yup.number()
    .min(0, "Notice Period cannot be negative")
    .optional(),
  GSTIN: Yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format")
    .required(" required"),
});
export const DetailSchema = Yup.object().shape({
  MaterialId: Yup.string()
    .required(" required"),
  Total: Yup.number()
    .required(" required"),

  Qty: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than 0")
    .required(" required"),

  Price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required(" required")
});

// const PurchaseReturnSchema = Yup.object({
// purchaseId: Yup.number().required("Purchase ID is required"),
// invoiceId: Yup.number().required("Invoice ID is required"),
// qty: Yup.number()
// .min(0.01, "Quantity must be greater than zero.")
// .required("Quantity is required"),
// unit: Yup.string()
// .max(50, "Unit cannot exceed 50 characters")
// .required("Unit is required"),
// total: Yup.number()
// .min(0.01, "Total must be greater than zero.")
// .required("Total is required"),
// returnDate: Yup.date().required("Return date is required"),
// });
//
// 









