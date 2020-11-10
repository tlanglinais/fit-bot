exports.capitalizeEveryWord = text => {
  console.log(text);

  // const words = text.split(" ");
  // console.log(words);

  // const filtered = words.filter()

  // wor
  return text
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};
