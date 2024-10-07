const textData = ["abc123", "abcabc1ab341ab"];

const RegExp = /(abc)+/

const exp_test = (str) => {
  const ans = RegExp.test(str);
  console.log(ans)
};

console.log("test")
textData.forEach((value) => {
  exp_test(value)
});

console.log('-----------------------')

const exp_match = (str) => {
  const ans = str.replace(RegExp, "222");
  console.log(ans)
};

console.log("match")
textData.forEach((value) => {
  exp_match(value)
});

console.log('-----------------------')

console.log("reverse inference")

RegExp_3 = /(abc)+\.\1/

const exp_reverse_reference = (str) => {
  const ans = str.replace(RegExp3, "$1");
  console.log(ans)
};

textData.forEach((value) => {
  exp_match(value)
});