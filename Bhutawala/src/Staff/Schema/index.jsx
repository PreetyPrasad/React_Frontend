import * as Yup from "yup";

export const LogInSchema = Yup.object().shape({
  FullName: Yup.string().required("Required"),
  Password: Yup.string().required("Required")
})
export const InvoiceSchema = Yup.object().shape({
  CustomerName: Yup.string().required('required'),
  ContactNo: Yup.string().matches(/^\d{10}$/, 'Invalid').required('required'),
  Email: Yup.string().email('Invalid email').required(' required'),
  InvoiceDate: Yup.date().required(' required'),
})