import * as Yup from "yup";

export const categoriesSchema = Yup.object().shape({
  Category: Yup.string()
    .min(3, "Category name is too short!")
    .max(50, "Category name is too long!")
    .required("Category name is required"),
});


export const TransactionYearMasterSchema = Yup.object().shape({
  YearName: Yup.string()
    .min(3, "Year name is too short!")
    .max(20, "Year name cannot exceed 20 characters")  // Matching the C# validation
    .required("Year name is required"),
});


export const SalesReturnSchema = Yup.object({
  Paymentmode: Yup.string().min(2).max(25).required("Paymentmode is required"),
  RefNo: Yup.string().min(2).max(25).required("RefNo is required"),
  ReturnDate: Yup.string().min(2).max(25).required("ReturnDate is required"),
  StaffId: Yup.string().min(2).max(25).required("StaffId is required"),
});
// Validation Schema
export const MaterialSchema = Yup.object({
  CategoryId: Yup.string().required("Category is required"),
  Unit: Yup.string().required("Unit is required"),
  Qty: Yup.number()
    .positive("Quantity must be positive")
    .required("Quantity is required"),
  Net_Qty: Yup.number()
    .positive("Net Quantity must be positive")
    .required("Net Quantity is required"),
  Brand: Yup.string().required("Brand is required"),
  GST: Yup.number()
    .min(0, "GST cannot be negative")
    .required("GST is required"),
  GST_Type: Yup.string().required("GST Type is required"),
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
    .required("Gross Total is required.")
    .min(0, "Gross Total must be non-negative."),
  GST: Yup.number()
    .required("GST  is required.")
    .min(0, "GST  must be non-negative."),
  GST_Type: Yup.string()
    .max(50, "GST Type cannot exceed 50 characters.")
    .nullable(),  // Optional field
  Total: Yup.number()
    .required("Total is required.")
    .min(0, "Total must be non-negative."),
  PurchaseDate: Yup.date().required("Purchase Date is required."),
  BillNo: Yup.string()
    .max(100, "Bill Number cannot exceed 100 characters.")
    .nullable(),  // Optional field
  NoticePeriod: Yup.date().required("Notice Period is required."),
  Note: Yup.string()
    .max(200, "Note cannot exceed 200 characters.")
    .nullable(),  // Optional field
});
export const StaffMasterSchema = Yup.object({
  FullName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed.")
    .required("Full name is required")
    .max(100, "Full name cannot be longer than 100 characters"),

  Address: Yup.string()
    .required("Address is required")
    .max(200, "Address cannot be longer than 200 characters"),

  Category: Yup.string().required("Category is required"),

  Qualification: Yup.string()
    .required("Qualification is required")
    .max(100, "Qualification cannot be longer than 100 characters"),

  AdharNo: Yup.string()
    .matches(/^\d{12}$/, "Must be 12 digits.")
    .required("Aadhar number is required"),

  Age: Yup.number()
    .min(18, "Age must be at least 18")
    .max(65, "Age must be at most 65")
    .required("Age is required"),

  Dj: Yup.string().required("Joining date is required"),

  Email: Yup.string()
    .email("Invalid Email.")
    .required("Email is required"),

  Password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[\W_]/, "Password must contain at least one special character"),
});
export const InvoiceValidationSchema = Yup.object({
  InvoiceNo: Yup.number()
    .required('Invoice Number is required.')
    .integer('Invoice Number must be an integer.'),

  CustomerName: Yup.string()
    .required('Customer Name is required.')
    .max(100, 'Customer Name cannot exceed 100 characters.'),

  ContactNo: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid Contact Number.')
    .required('Contact Number is required.'),

  TotalGross: Yup.number()
    .required('Total Gross is required.')
    .min(0, 'Total Gross must be non-negative.'),

  GST: Yup.number()
    .required('GST is required.')
    .min(0, 'GST must be at least 0%.')
    .max(100, 'GST cannot exceed 100%.'),

  GST_TYPE: Yup.string()
    .max(50, 'GST Type cannot exceed 50 characters.')
    .nullable(),

  Total: Yup.number()
    .required('Total is required.')
    .min(0, 'Total must be non-negative.'),

  InvoiceDate: Yup.date()
    .required('Invoice Date is required.')
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
  MaterialId: Yup.number().nullable().required("Material is required."),
  PurchaseId: Yup.number().nullable().required("Purchase is required."),
  Qty: Yup.number()
    .required("Quantity is required.")
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
  StaffId: Yup.number().required("Staff ID is required."),
});
export const PurchaseReturnSchema = Yup.object().shape({
  // PurchaseId: Yup.number().nullable(), // Can be null
  // InvoiceId: Yup.number().nullable(), // Can be null

  Qty: Yup.number()
    .min(0.01, "Quantity must be greater than zero.")
    .required("Quantity is required."),

  Unit: Yup.string()
    .max(50, "Unit cannot exceed 50 characters.")
    .required("Unit is required."),

  Total: Yup.number()
    .min(0.01, "Total must be greater than zero.")
    .required("Total is required."),

  ReturnDate: Yup.date()
    .required("Return date is required.")
});

export const InvoiceDetailSchema = Yup.object().shape({
  Rate: Yup.number()
    .required("Rate is required")
    .min(0, "Rate must be non-negative"),

  Qty: Yup.number()
    .required("Quantity is required")
    .min(0, "Quantity must be non-negative"),

  Unit: Yup.string()
    .required("Unit is required")
    .max(50, "Unit cannot exceed 50 characters"),

  GSTAmount: Yup.number()
    .required("GST Amount is required")
    .min(0, "GST Amount must be non-negative"),

  Total: Yup.number()
    .required("Total is required")
    .min(0, "Total must be non-negative"),
});
export const purchasePaymentSchema = Yup.object({

  // Amount: Yup.number()
    // .required('Amount is required')
    // .required("Amount is required"),

  PaymentMode: Yup.string().required('Payment Mode is required'),
  PaymentDate: Yup.date().required('Payment Date is required'),
});
export const DebitSchema = Yup.object({
  amount: Yup.number()
    .min(0.01, "Amount must be greater than zero")
    .required("Amount is required"),
  noteDate: Yup.date().required("Note date is required"),
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