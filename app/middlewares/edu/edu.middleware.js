// (전역용)
export const eduTest = (request, response, next) => {
  console.log('eduTest 미들웨어 실행')
  next(); // 다음 미들웨어 또는 처리로 진행 (전역용)
}

// 함수 표현식 vs 선언식 무엇이 ()안에 있는 사라지지 않고 데이터가 남아 있는 가
// function expression starts from const and a const in {} doesnt disappear.
// function declaration starts from function and a const in {} become nothing after finishing the code.
// and fd has a hoisting problem so people cafully use fd tho

// (users용)
export const eduUsersTest = (request, response, next) => {
  console.log('eduUsersTest 미들웨어 실행');
  next(); // 다음 미들웨어 또는 처리로 진행 (users용)
}
