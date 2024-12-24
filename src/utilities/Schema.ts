import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your Email or Phone number')
    .trim('Please enter your Email or Phone number'),
  password: yup
    .string()
    .required('Please enter your Password')
    .trim('Please enter your Password')
    .min(6, "Password must contain atleast 6 chsracters"),
});
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
  showme: yup
    .string()
    .required('Please select your Showme')
    .trim('Please select your Showme'),
  email: yup
    .string()
    .required('Please enter your Email or Phone number')
    .trim('Please enter your Email or Phone number'),
  password: yup
    .string()
    .required('Please enter your Password')
    .trim('Please enter your Password')
    .min(6, "Password must contain atleast 6 chsracters"),
 Lookingfor: yup
    .string()
    .required('Please select your Lookingfor')
    .trim('Please select your Lookingfor'),
 About: yup
    .string()
    .required('Please select your About')
    .trim('Please select your About'),

});
