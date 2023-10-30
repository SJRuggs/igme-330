const defaultName   = "Mr. X";
const formatGreeting = (greeting, name, forcefully) => {
  const recipient   = name ? name : defaultName;
  const str         = `${greeting} ${recipient}`;
  return forcefully ? `${str.toUpperCase()}!` : str;
};

export { formatGreeting };
