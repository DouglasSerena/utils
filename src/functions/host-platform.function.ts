/**
 * @function
 * @description Verifica em qual plataforma esta sendo rodado o javascript */
export function hostPlatform(): "apple" | "pc" {
  const appleDevices = ["Mac", "iPhone", "iPad", "iPhone"];
  return appleDevices.some((device) => navigator.userAgent.includes(device)) ? "apple" : "pc";
}
