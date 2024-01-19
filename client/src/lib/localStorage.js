export function formatPrivateKeyString(inputString) {
  const beginMarker = `-----BEGIN ENCRYPTED PRIVATE KEY-----`;
  const endMarker = `-----END ENCRYPTED PRIVATE KEY-----`;
  // Split the inputString by the beginning and ending markers
  const parts = inputString.split(beginMarker);
  // Check if there are two parts (beginning and ending markers)
  if (parts.length === 2) {
    // Split the second part by the ending marker
    const endParts = parts[1].split(endMarker);
    // Check if there are two parts (middle and ending marker)
    if (endParts.length === 2) {
      // Replace spaces with '\\n' in the middle part
      const middlePart = endParts[0].replace(/\s+/g, "\\n");
      // Reconstruct the formatted string
      const formattedString = beginMarker + middlePart + endMarker;

      return formattedString;
    }
  }

  // If the inputString doesn't match the expected format, return it unchanged
  return inputString;
}
export const setToLocalStorage = (key, value) => {
  if (typeof key !== "string") {
    throw new Error("First argument is not a string");
  }
  if (key === "") {
    throw new Error("First argument is empty");
  }
  try {
    const stringValue = JSON.stringify(value);
    // console.log(value, "ovo radimo");
    // const encodedValue = Buffer.from(stringValue)
    //   .toString("base64")
    //   .replace("\\n", "\n");
    // // const stringValue = JSON.stringify(value, null, 0).replace(/\\n/g, "\n");

    localStorage.setItem(key, stringValue);
  } catch (err) {
    if (err === "QUOTA_EXCEEDED_ERR") {
      console.error(`Local storage is full`);
    }
    console.log(err, "greska");
    console.error(`Error setting value "${value}" in key "${key}"`);
  }
};
export const removeFromLocalStorage = (key) => {
  if (typeof key !== "string") {
    throw new Error("First argument is not a string");
  }
  if (key === "") {
    throw new Error("First argument is empty");
  }
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing "${key}"`);
  }
};

// const inut = `-----BEGIN ENCRYPTED PRIVATE KEY-----
// MIIJrTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIwc1yf1039HMCAggA
// MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBBqSYRDGlViZlYC/r4EJpa4BIIJ
// UNrcFuxdGgZOXP8RBUyEEc0I6AuhzQ7gUOga71XdJiRn5rJbEoq8hZ1pbRIETa/6
// M8oNE/5U1z1MqdZlMJ0h9GqVSfknVOx91SnO349ojyM4+z5L5GwBe9WKLybdthyK
// l+gSf6TR6xXBruqFHEobHXECP/9QqjOSYsr8+NUJdIEIxwmlz79UYZCjF03ldARE
// i3Deysq4dF7vWT4fCnPhjKb3O6HuvK40gSwRVEMvkXhq8UjsiCUympV7tm8jFNhW
// TaVDw8fse2OiVu3prIpVnDLzzRsdP96devFPR0HXC4Nn4UbwS61msupsB1qv6Wmr
// DdwBsoXNTCItimrY+zu3/gmWJ73I1W8r2Yz7wJOyk+v2FNZT6d4Oky7SmZZbGeh9
// baAPnK9ybfUw/d6Mg2m0QSe9Atl6QHrYcMAlu37RiQJyqRofZgWjxpCOCkegBxPm
// zP6v3v5kltvJCAnIIEwADxuvhymDTCazYf+aeHNNwNZO5fAzha2RCUov4+xeIJrl
// Sr80a0Rjsc2SXlmumYEdqXGWoNyvPGhr/LLK77xpPH0cierBfnyDxkOpYBNn1nXE
// uhM34m7DL3XSyWU3pbJqhrS4T/uvnDQux3GDJikTeCFpbMnAZPpKbPSwAQaaGLyt
// cDfLkBhxa2H9Y2h6A/bdyIl3G39IQoN/z4C1LPotB1TM3EXxMAEA8ar3OguvKMBi
// 0E784ho2x0EQy52sAdzcUO4WhWBt71Hn/xVPArFmN43y8RgGggcO5ges1wtlny62
// U7gztfyYzWg2aQLjV+4bA1nWZmW9RYZQDSGxRIcBr2bdUy6nGOHQaBALMeBo7cRO
// EFT4PavCj3EDxq+MhsdZPirUagsQWVmsQLl7pL70q0VLJjpyPfhhDKT4KlS0DRLy
// KgksENpQN25A7SMmhI7PC8es6aAbhOvUv0sciFuEwZ0wnPwyWrnGvCgGRSvbt4+s
// ujHlqflZm0rremf5wfJ4OTCoki3OpB+tAUcPj32rASjyYzTTJtgEaW1Zd7+sJyUf
// cBlCWCKfvdyF8ragcd0cBuPz0CP5ljAzBeseLJWCGU3Wzgqcd+CfB8zt2qOvtivk
// 036xjFlmKRwPcxDo4eYvBEIfaSEuxSnrzII1TpZGgdmUVfEwcStmwP/fDdQQy0bv
// blWvGB4fS14Tcs6qxmiStXFQVre/UxtMl3RbW0x7soeQUR/CSFkGTqSklWMlhtC6
// O0xK9m3K2wzWTODx1eS3rsYws6lEVjKm+NMmZbgH5+4a0PcwRlPWgmx0dNDWVEEW
// mXnRptvOHSsqsEemLwA02RKOVRqRnXTJ9QqTdU391mjyTrGBkAWQkdAErV3mOq+M
// dLmpSKCgGxgo32t+jn36+twCFm/Tq8zqx5n+s2Ue8b4Mlw8FTmVh7iYOEDt0B/R+
// 8RatSMvXf5/kTh6toZI4kS/pBovX/uP08iZFga1yYjKl9oZ1TbRlwo8BpVvLO5Jr
// fgCq5HjgJcpn7P9jWi6jRVAfzqJTeOtJ9w2E5KTjgoN2snlZjIknQsyvQl0wpb81
// /WXzeCihK5povI9ekcUGNAZ+t2athWuZtOjwlbOsDRI1Ut7+V3uv8BKBDftXx+ul
// nFwSxZ3/2PJD8JuJlEMkdWzpliIwk9iNwk3rmU0/OVj56XauNUuEEXrUaGNeln+8
// YEvXfq0w921sFCt3AYv3eV+UEVTgJT9O8yqCRmTXVj3Tb339gJ/fYTEh5Hzr+aRI
// q2hoVc47N9pmV91Y9H0NeBoNqEF5n9xpZIJWyF0+vwsGNrgSCdIRLVSfa8EGZkKS
// xw+MTV0aDtjvCgIAM3pkiFnzL45UzEMbLW8seRitDmDnmFmE3HpBDndwxr5oz+fd
// Cv5vm+XKR3hWHbzXAtTPx5A70KRtk3UbSzcDT7nt6S7Cp+oSZ/TN6gxEIlgYhDK6
// WUaZ4460WrVmSQHbq+76fMDRdJKbg3AbENupPeyqfWTa/Wxa7KFTJtVNoR98Wvei
// g0AhPVgwurU4IaPnuBKNeRIkksXrEMBeWf7s22WkQKooVGZd76JkT38tanKXAi9n
// XK6tXiSv3oVgYzcKuq+ieSojabyzrOlP5e3Ab9lmgOmNSqGubKraavd5HoIEHPyR
// Bot/4Bz/kK6VBo3Y7PuruptbpVGFz1lSOmn+OPQwepZyTHkHjBowQSn/jOqgVKEr
// xGkzYvDjnKiCnkN8pgu6jhFDJt6/TziKJR2NoiLBXQi6GerDHw606Fq75PCNLT5U
// 85spGgSNX38RGsOgwHYTnavAKjpK0+Mxq75w/szL2VKRbp0tHBqDlfZ1HWjmlykO
// J+E+3FDYSBN9DqbeJDciO/35YKsQz3HMtvuKDXMMiqc9npC7jxiEMNAJ/+XFqcMZ
// +fGMsQ0JQwD/jOmqXAckePyZVyWG2q2HA2BWAaB4ergftlqMrueQ+OVv10QBkA/N
// 4M5xfkxVlDPWUs4KRN5bww51GWYg2ODfGbFn/CBB2XkpygdtAbUuM1Gr4p+fKrOH
// csZb6KX/f/qMM0/rjQYY54EzUO/LMJYfjb58MRXmah6VtWc21LPsw0B2Ofu7nY/p
// VTSasG0zHIYDv+M7KU8KadZ3kBpTRJ0jPzF7m3EoI2EhT1wtgzHrno1qESOyklGX
// peyaSF+VS7xkLFAd6eiaIvInjKBaYjXQltJIftyotCvMBq5e/CFSuHAd0QbiNR4e
// Q0Bk/pvqWcUsbsUOUBxLGT2u3DZsHAq0KbEsMVOsaROny5nbe5m6hKbrFABhOkpS
// XQYzqSaea1CYAO7CnnExJmkofFTGvTMW2DBeBtiVhMrTGQsvrIJqs+P2AOYk5h9f
// YocT/uvCI+1ke58UkELzNgZVCnh1A1itoG/nKEWSioZaQqLzvtF2HgS+IgkWy97t
// FP6B0Ezw6QRX1PFcJAr4ferPbyvkl7Cj6Td8/QITHVgNdG6RPWq8q5vfpAPZFPUo
// 3x4KHJzNvEaaI4bdDgJejEf/udHV78jiQhpAVEwAY+Cu2nuYrBK7fhs793INL5wg
// DRL1Dua8st7EZYhEX0+R8uYSqhaKcn0PlaDXWlcUpReNz6JuU8G7rbHDu/+6D7Wr
// eu1ZmHRT7CX40mUVxdE0bCWP4WEM47+Uu7YkcuyFt0dwqVTE2HP4yWAnP9qLI/de
// cpGdk65Rn7wv/8fKyzEkBlO32xhExI+LQmVoj4ILa4il
// -----END ENCRYPTED PRIVATE KEY-----`;

// console.log(formatPrivateKeyString(inut));
