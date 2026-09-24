export type Trick = {
  id: string;
  title: string;
  body: string;
  watch?: string;
};

export const TRICKS: Trick[] = [
  {
    id: "given",
    title: "GIVEN = denominator",
    body: "The group after “given that”, “among those who”, or “of the people who” becomes the whole world. Divide by that group, not the grand total.",
    watch: "given that · among those who · of the [group] who",
  },
  {
    id: "or",
    title: "OR = ADD, subtract the overlap",
    body: "P(A OR B) = P(A) + P(B) − P(A AND B). You subtract because the overlap was counted twice. If they cannot happen together, the overlap is 0 and you just add.",
    watch: "or · either · at least one",
  },
  {
    id: "and",
    title: "AND = MULTIPLY",
    body: "“And”, “then”, “followed by”, “both” usually mean multiply. Independent: P(A)×P(B). Dependent: P(A)×P(B|A).",
    watch: "and · then · followed by · both",
  },
  {
    id: "wor",
    title: "WITHOUT REPLACEMENT = TOTAL DROPS",
    body: "Ask three questions: What changed? Did the total change? Did the favorable count change? Then multiply the chain.",
    watch: "without replacement · not replaced · then another",
  },
  {
    id: "indep",
    title: "Independent = probability DOESN’T CHANGE",
    body: "If P(B) = P(B|A), A told you nothing new about B. That’s independence. If the numbers differ, they are dependent.",
  },
  {
    id: "dep",
    title: "Dependent = probability CHANGES",
    body: "Without replacement is the classic dependent story. Drawing a card changes the deck, so the next probability is different.",
  },
  {
    id: "emp",
    title: "68-95-99.7",
    body: "Normal / mound-shaped data: about 68% within 1 SD of the mean, 95% within 2 SD, 99.7% within 3 SD. Distance from mean ÷ SD = number of SDs.",
  },
  {
    id: "complement",
    title: "Add what you know → subtract from 1",
    body: "A complete list of outcomes has total probability 1. Missing piece = 1 − (sum of the listed pieces). NOT A is the same idea: 1 − P(A).",
  },
  {
    id: "prime",
    title: "1 is not prime. 2 is the only even prime.",
    body: "Prime = exactly two factors. List the primes first, then divide by the number of faces. Don’t try to count and divide in one messy step.",
  },
  {
    id: "table",
    title: "Of THIS group → that group’s total",
    body: "“What percentage of placebo participants passed?” Placebo total is the denominator. Grand total is only for questions about everyone.",
  },
  {
    id: "r",
    title: "Sign first, then strength",
    body: "Upward cloud → positive r. Downward → negative. Tight line → |r| near 1. Fuzzy blob → |r| near 0. The number r often is not printed on the plot.",
  },
  {
    id: "reg",
    title: "Plug x into ŷ = a + bx",
    body: "Multiply x by the slope, add the intercept. If r is sitting next to the equation and nobody asked for it, ignore r.",
  },
  {
    id: "excl",
    title: "Mutually exclusive ≠ independent",
    body: "Mutually exclusive: cannot happen together (overlap 0). Independent: one doesn’t change the other’s probability. If two events with P>0 are exclusive, they are dependent.",
  },
  {
    id: "z",
    title: "z = (x − mean) / SD",
    body: "Convert a raw score into “how many SDs from the mean.” Negative means below the mean.",
  },
  {
    id: "interval",
    title: "Filled dot includes. Open dot excludes.",
    body: "≥ and ≤ get filled dots / square brackets. > and < get open dots / parentheses. Infinity always gets a parenthesis.",
  },
  {
    id: "rational",
    title: "Repeating decimals are rational",
    body: "0.333… = 1/3. Terminating and repeating decimals can be written as fractions. √2 and π cannot.",
  },
];
