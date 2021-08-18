import { AnyMaskedOptions } from "imask";
import { SimpleMaskMoneyConfig } from "simple-mask-money";
import { isTypeof, notIsTypeof } from "../validations/common/common.validation";
import { CUSTOM_MASKS } from "./custom.masked";
import { MaskIMask } from "./imask/mask-imask";
import { ConfigMask, IMaskCustom, IServiceMask } from "./masked.type";
import { MaskVanillaMasker } from "./vanilla-masker/vanilla-masker";

export function masked(
  pattern: string | Partial<ConfigMask>,
  config?: Partial<ConfigMask>
): IServiceMask {
  if (isTypeof<string>(pattern, "string")) {
    const custoMaskKeys = Object.keys(CUSTOM_MASKS);
    if (custoMaskKeys.includes(pattern?.toUpperCase())) {
      const CUSTOM_MASK = CUSTOM_MASKS[pattern?.toUpperCase()];

      if (CUSTOM_MASK.type === "MASK") {
        config = Object.assign({}, CUSTOM_MASK.config, config);
        return new MaskIMask(config as AnyMaskedOptions);
      } else {
        config = Object.assign({}, CUSTOM_MASK.config, config);
        return new MaskVanillaMasker(config as SimpleMaskMoneyConfig);
      }
    }

    return new MaskIMask(pattern, config as AnyMaskedOptions);
  }

  if ((pattern as AnyMaskedOptions).mask) {
    return new MaskIMask(pattern as AnyMaskedOptions);
  } else {
    return new MaskVanillaMasker(pattern as SimpleMaskMoneyConfig);
  }
}

masked.custom = (name: string, mask: IMaskCustom) => (CUSTOM_MASKS[name] = mask);
