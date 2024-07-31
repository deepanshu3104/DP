import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your Display Name')
    .trim('Please enter your Display Name'),
  dob: yup
    .string()
    .required('Please select your Date of Birth')
    .trim('Please select your Date of Birth'),
  gender: yup
  .string()
  .required('Please select your Gender')
  .trim('Please select your Gender'),
  

});
