import { AnyMaskedOptions } from "imask";
import { SimpleMaskMoneyConfig } from "simple-mask-money";
import { CUSTOM_MASKS } from "../counts/mask.type";
import { isArray, isTypeof } from "../validations/common/common.validation";
import { MaskIMask } from "./imask/mask-imask";
import { IConfigMaskIMask } from "./imask/mask-imask.type";
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
        const _config = CUSTOM_MASK.config as any;
        if (isArray(_config.mask)) {
          _config.mask = _config.mask.map((mask: IConfigMaskIMask) => {
            return Object.assign({}, config, mask);
          });
        }
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
