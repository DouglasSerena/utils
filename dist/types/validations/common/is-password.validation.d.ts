export interface IPasswordOptionsDisabled {
    charUpperCase?: boolean;
    charSpecial?: boolean;
    number?: boolean;
}
export declare function isPassword<T = string>(value: T, disabled?: IPasswordOptionsDisabled, minLength?: number): boolean;
