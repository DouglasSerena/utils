import { AnyMaskedOptions } from "imask";
import { SimpleMaskMoneyConfig } from "simple-mask-money";
import { CUSTOM_MASKS } from "./custom.masked";
import { MaskIMask } from "./imask/mask-imask";
import { ConfigMask, IMaskCustom, IServiceMask } from "./masked.type";
import { MaskSimpleMaskMoney } from "./simple-mask-money/mask-simple-mask-money";

export function masked(pattern: string, config?: ConfigMask): IServiceMask {
  const custoMaskKeys = Object.keys(CUSTOM_MASKS);
  if (custoMaskKeys.includes(pattern)) {
    const CUSTOM_MASK = CUSTOM_MASKS[pattern];

    if (CUSTOM_MASK.type === "IMASK") {
      config = Object.assign({}, CUSTOM_MASK.config, config);
      return new MaskIMask(config as AnyMaskedOptions);
    } else {
      config = Object.assign({}, CUSTOM_MASK.config, config);
      return new MaskSimpleMaskMoney(config as SimpleMaskMoneyConfig);
    }
  }

  return new MaskIMask(pattern, config as AnyMaskedOptions);
}

masked.custom = (name: string, mask: IMaskCustom) => (CUSTOM_MASKS[name] = mask);
