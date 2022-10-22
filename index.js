const readline = require("readline");
const { stdin: input, stdout: output } = require("process");

const quadraticPolynomial = (eq) => {
  eq = eq.toLowerCase();
  if (!/^[0-9^x+-\s.]+$/i.test(eq) || /^[\s]+$/.test(eq) || !eq) {
    return SyntaxError(
      "Input cannot be empty or include characters beyond 0-9^x+-"
    );
  }

  eq = eq.replace(/\s/g, "").replace(/-/g, "+-").split(/[+]/);

  let a = eq.filter((eq) => eq.includes("x^"));
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "x^2") a[i] = "1x^2";
    if (a[i] === "-x^2") a[i] = "-1x^2";
  }
  
  a = a
    .reduce((pV, cV) => pV + cV, "")
    .toString()
    .split("x^2")
    .filter((a) => a)
    .map(Number)
    .reduce((pV, cV) => pV + cV, 0);

  if (a === 0 || a === "")
    return SyntaxError("Coefficient 'a' cannot be equal to 0");
  if (isNaN(a)) return SyntaxError("Syntax error");

  let b = eq.filter((eq) => eq.includes("x") && !eq.includes("x^"));
  
  for (let i = 0; i < b.length; i++) {
    if (b[i] === "x") b[i] = "1x";
    if (b[i] === "-x") b[i] = "-1x";
  }
  
  b = b
    .reduce((pV, cV) => pV + cV, "")
     .toString()
     .split("x")
     .filter((b) => b)
     .map(Number)
     .reduce((pV, cV) => pV + cV, 0);

  let c = eq
    .filter((eq) => !eq.includes("x") && !/^[-]+$/.test(eq))
    .map(Number)
    .reduce((pV, cV) => pV + cV, 0);

  let delta = b ** 2 - 4 * a * c;

  if (delta < 0) return [];
  if (delta === 0) {
    let root1 = (-b / 2 * a);
    
    if (root1 == -0) root1 = Math.abs(root1);

    return [root1];
  }
  if (delta > 0) {
    
    let root1 = (-b - Math.sqrt(delta)) / (2 * a);
    let root2 = (-b + Math.sqrt(delta)) / (2 * a);
    
    if (root1 == -0) root1 = Math.abs(root1);
    if (root2 == -0) root2 = Math.abs(root2);

    return [root1, root2];
  }
};

const rl = readline.createInterface({ input, output });
var recursiveAsyncReadline = function () {
  rl.question(
    "Enter quadratic polynomial to find it's roots, the only variable must be an x (q to quit) ",
    (eq) => {
      if (eq == "q") return rl.close();
      console.log(quadraticPolynomial(eq));
      recursiveAsyncReadline();
    }
  );
};

recursiveAsyncReadline();
