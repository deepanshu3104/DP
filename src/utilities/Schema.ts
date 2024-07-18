import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  number: yup
    .string()
    .required('Please enter your Phone Number')
    .trim('Please enter your Phone Number')
    .min(10, 'Phone number must be 10 characters long'),
  dob: yup
    .string()
    .required('Please select your Date of Birth')
    .trim('Please select your Date of Birth'),
  skills: yup.array().min(1, 'Please select atleast one Skill'),
});
