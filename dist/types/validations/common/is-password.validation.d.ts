export interface IPasswordOptionsDisabled {
    charUpperCase?: boolean;
    charSpecial?: boolean;
    number?: boolean;
}
export declare function isPassword(value: string, disabled?: IPasswordOptionsDisabled, minLength?: number): boolean;
