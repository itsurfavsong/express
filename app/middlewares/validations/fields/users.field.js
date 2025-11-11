// 3개만 하자
// id / password / main
// 현재보다 미래를 봤을 때 훨씬 낫다. if 절 계속 쓸 필요 없다.

import { body } from "express-validator";

// 아이디 필드----------------------------------------------------
export const account = body('account')
  .trim()
  .notEmpty()
  .withMessage('아이디는 필수 항목입니다')
  .bail()
  .matches(/^[a-zA-Z0-9]{4,8}$/)
  .withMessage('영어대/소문자, 숫자, 4~8 글자 허용');

// 비밀번호 필드---------------------------------------------------
export const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다')
  .bail()
  .matches(/^[a-zA-Z0-9!@]{4,8}$/)
  .withMessage('영어대/소문자, 숫자, 특수문자(!@), 4~8 글자 허용');

// 이름 필드------------------------------------------------------
export const name = body('name')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다')
  .bail()
  .matches(/^[가-힣]{2,30}$/)
  .withMessage('한글 2~30글자 허용');

// 요새는 잘 안쓰는 예시 -
// const test = 's a d f j f l s k'.trim();
// if(!test) {
//   return '아이디는 필수 항목입니다.';
// }
// if(/^[a-zA-Z0-9]{4,8}$/.test(test)) {
//   return
// }
