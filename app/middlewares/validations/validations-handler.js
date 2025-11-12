// 그 값이 오류인지 확인해야함.
import { validationResult } from "express-validator";

export function validatorHandler(request, response, next) {
  // request에 담긴 유효성 검사 결과 가져오기
  // validationResult(request) : request에 담긴 유효성 검사 결과 중, 에러를 모아서 배열로 반환
  const errors = validationResult(request);

  // 에러가 있으면 400과 함께 반환 (“비어 있지 않다 → 에러가 있다” 그리고 이 말은 true)
  // formatWith는 JS의 map 함수와 같다.
  if (!errors.isEmpty()) {
    const customErrors = errors.formatWith(error => `${error.path}: ${error.msg}`);
    return response.status(400).send(customErrors.array());
  }

  // 에러 없으면 다음 미들웨어로
  next();
}
