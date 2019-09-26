import React, { Component, Fragment } from "react";
import { validationMessage } from "_constants/ValidationMessage";
import creditcard from "card-validator";
import MaskedInput from "react-text-mask";
import * as Yup from "yup";
import _ from "lodash";

/*Regex */
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
const alphaOnlyRegExp = /^[a-zA-Z]+$/;
const alphaWithOneSpaceRegExp = /^(\w+\s?)*\s*$/;
const numberRegExp = /^[0-9]*$/;
const expiryDateRegExp = /^\d{2}\/\d{4}$/;

/*Expiry Date Input Mask*/
export const ExpiryDateInputMask = props => {
  const { inputRef, ...other } = props;
  return (
    <Fragment>
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[0-9]/, /\d/, "/", /[2-9]/, /\d/, /\d/, /\d/]}
      // showMask
      />{" "}
    </Fragment>
  );
};

/*Credit card number Input Mask*/
export const CardNumberInputMask = props => {
  const { inputRef, ...other } = props;
  return (
    <Fragment>
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/\d/, /\d/, /\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ", /\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/]}
      // showMask
      />{" "}
    </Fragment>
  );
};


export const cardNumberMask = [/\d/, /\d/, /\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ", /\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/]
export const expiryDateMask = [/[0-9]/, /\d/, "/", /[2-9]/, /\d/, /\d/, /\d/]

/*Card Validation */
export const creditcardValidation = number => {
  var card_details = {
    brand: "",
    isValid: false
  };
  var cardDetail = creditcard.number(number);
  if (!_.isEmpty(cardDetail.card)) {
    card_details.brand = _.lowerCase(cardDetail.card.niceType);
    card_details.isValid = cardDetail.isValid;
  }

  return card_details;
};

/*White space trim */
export const whiteSpaceTrim = (e, setFieldValue) => {
  setFieldValue(e.target.name, e.target.value.replace(/\s/g, ""));
};

/*Number only*/
export const numberOnly = (e, setFieldValue) => {
  if (!e.target.value.match(numberRegExp)) {
    setFieldValue(e.target.name, e.target.value.replace(/[^0-9.]+/g, ""));
    // setFieldValue(e.target.name, e.target.value.replace(/[^0-9\.]+/g, ''));
  } else {
    setFieldValue(e.target.name, e.target.value);
  }
};

// Admin user form validation
export const userValidationSchema = Yup.object().shape({
  // `Name ${validationMessage.required}`,
  name: Yup.string()
    .required(`Name ${validationMessage.required}`)
    .matches(
    alphaWithOneSpaceRegExp,
    `Name ${validationMessage.alphaWithOneSpace}`
    ),
  email: Yup.string()
    .required(`Email ID ${validationMessage.required}`)
    .email(validationMessage.validEmailId)
    .max(64, `Email id ${validationMessage.maxLength64}`),
  phone: Yup.string()
    .required(`Phone number ${validationMessage.required}`)
    .min(11, `Phone Number ${validationMessage.minNumber11}`)
    .max(13, `Phone Number ${validationMessage.maxNumber13}`),
  subscription_id: Yup.string().required(
    `Plan subscribed ${validationMessage.required}`
  )
});

//Account Settings
export const accountSettingValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(`Email ID ${validationMessage.required}`)
    .email(validationMessage.validEmailId)
    .max(64, `Email ID ${validationMessage.maxLength64}`),
  phone: Yup.string()
    .required(`Phone number ${validationMessage.required}`)
    .min(11, `Phone Number ${validationMessage.minNumber11}`)
    .max(13, `Phone Number ${validationMessage.maxNumber13}`)
});

// Login form validation
export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(`Email ID ${validationMessage.required}`)
    .email(validationMessage.validEmailId),
  password: Yup.string().required(`Password ${validationMessage.required}`)
});
// Sign up form validation
export const signupValidationSchema = Yup.object().shape({
  username: Yup.string().required(`Username ${validationMessage.required}`),
  email: Yup.string()
    .required(`Email ID ${validationMessage.required}`)
    .email(validationMessage.validEmailId)
    .max(64, `Email ID ${validationMessage.maxLength64}`),
    phone: Yup.string()
    .required(`Phone number ${validationMessage.required}`)
    .min(11, `Phone Number ${validationMessage.minNumber11}`)
    .max(13, `Phone Number ${validationMessage.maxNumber13}`)
});

// Forgot password validation
export const forgotValidationSchema = Yup.object().shape({
  // email: Yup.string().required(`Email ID ${validationMessage.required}`).email(validationMessage.validEmailId)
});

// Reset password validation
export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required(`Set New Password ${validationMessage.required}`)
    .min(8, `Set New Password ${validationMessage.minChar8}`)
    .max(16, `Set New Password ${validationMessage.maxChar16}`)
    .matches(
    passwordRegExp,
    `Set New Password ${validationMessage.validPassword}`
    ),

  confirm_password: Yup.string()
    .required(`Confirm Password ${validationMessage.required}`)
    .oneOf([Yup.ref("password"), null], "Password mismatch! Retry")
});

// Admin Reset password validation
export const adminResetPasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string()
    .required(`Old Password ${validationMessage.required}`)
    .min(8, `New Password ${validationMessage.minChar8}`),
  password: Yup.string()
    .required(`New Password ${validationMessage.required}`)
    .min(8, `New Password ${validationMessage.minChar8}`)
    .max(16, `New Password ${validationMessage.maxChar16}`)
    .matches(
    passwordRegExp,
    `Set New Password ${validationMessage.validPassword}`
    ),
  confirm_password: Yup.string()
    .required(`Confirm Password ${validationMessage.required}`)
    .oneOf([Yup.ref("password"), null], "Password mismatch! Retry")
});

//Admin subscrition Validation
export const subscriptionValidationSchema = Yup.object().shape({
  plan_name: Yup.string().required(`Name ${validationMessage.required}`),
  description: Yup.string().required(
    `Description ${validationMessage.required}`
  ),
  validity_in_days: Yup.string().required(
    `Validity ${validationMessage.required}`
  ),
  price: Yup.string().required(`Price ${validationMessage.required}`),
  benefits: Yup.array()
    .of(Yup.string().required(`Benefits ${validationMessage.required}`))
    .required(`Benefits ${validationMessage.required}`)
});

//Admin transaction Validation
export const transactionValidationSchema = Yup.object().shape({});

//Card validation
export const cardValidationSchema = Yup.object().shape({
  name: Yup.string().required(`Card Holder Name ${validationMessage.required}`),
  number: Yup.string()
    .required(`Card Number ${validationMessage.required}`)
    .length(16, cards => {
      let card = creditcardValidation(cards.value);
      console.log(card);
      if (!card.isValid) {
        return validationMessage.validCardNumber;
      }
      return ``;
    }),
  expiry_date: Yup.string()
    .required(`Expirt Date ${validationMessage.required}`)
    .matches(expiryDateRegExp, `${validationMessage.validExpiryDate}`),
  cvc: Yup.string().required(`CVC ${validationMessage.required}`)
});

//Card validation
export const deleteAccountValidationSchema = Yup.object().shape({
  password: Yup.string().required(`Password ${validationMessage.required}`)
});

//Redirect validation
export const redirectValidationSchema = Yup.object().shape({
  url: Yup.string().required(`Redirect Url ${validationMessage.required}`)
    .url(validationMessage.validURL)
});

//Buyplan validation
export const buyPlanValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required(`Email ID ${validationMessage.required}`)
    .email(validationMessage.validEmailId),
  phone: Yup.string()
    .required(`Phone ${validationMessage.required}`)
    .matches(phoneRegExp, validationMessage.isPhone),
  name: Yup.string().required(`Card Holder Name ${validationMessage.required}`),
  number: Yup.string()
    .required(`Card Number ${validationMessage.required}`)
    .length(16, cards => {
      let card = creditcardValidation(cards.value);
      if (!card.isValid) {
        return validationMessage.validCardNumber;
      }
      return ``;
    }),
  expiry_date: Yup.string()
    .required(`Expirt Date ${validationMessage.required}`)
    .matches(expiryDateRegExp, `${validationMessage.validExpiryDate}`),
  cvc: Yup.string().required(`CVC ${validationMessage.required}`)
});
