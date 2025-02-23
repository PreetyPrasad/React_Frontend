import * as Yup from "yup";

export const categoriesSchema = Yup.object().shape({
  Category: Yup.string()
    .min(3, "Category name is too short!")
    .max(50, "Category name is too long!")
    .required("Category name is required"),
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
  txtUnit: Yup.string().required("Unit is required"),
  txtQty: Yup.number()
    .positive("Quantity must be positive")
    .required("Quantity is required"),
  txtNet: Yup.number()
    .positive("Net Quantity must be positive")
    .required("Net Quantity is required"),
  txtBrand: Yup.string().required("Brand is required"),
  txtGST: Yup.number()
    .min(0, "GST cannot be negative")
    .required("GST is required"),
  txtGSTType: Yup.string().required("GST Type is required"),
  txtDescription: Yup.string().max(200, "Description too long"),
});

export const SupplierSchema = Yup.object({
  BusinessName: Yup.string().required(" required"),
  ContactPerson: Yup.string().required(" required"),
  ContactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact No must be 10 digits")
    .required(" required"),
  Email: Yup.string()
    .email("Invalid email format")
    .required(" required"),
  Address: Yup.string().required(" required"),
  City: Yup.string().required(" required"),
  State: Yup.string().required(" required"),
  PinCode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pin Code must be 6 digits")
    .required(" required"),
  GSTIN: Yup.string().optional(),
  PAN: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .required("PAN is required"),
  BanckBranch: Yup.string().required(" required"),
  IFSC: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format")
    .required("IFSC is required"),
  AccountNo: Yup.string().required(" required"),
  BankName: Yup.string().required(" required"),
  LogDate: Yup.date().nullable().required("required"),
});

export const PurchaseMasterSchema = Yup.object({
  txtNote: Yup.string().required(" required"),
});


