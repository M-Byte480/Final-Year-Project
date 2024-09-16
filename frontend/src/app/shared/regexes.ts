export const LOOK_AHEAD_LOWERCASE = '(?=.*[a-z])';
export const LOOK_AHEAD_UPPERCASE = '(?=.*[A-Z])';
export const LOOK_AHEAD_DIGITS = '(?=.*\\d)';
export const LOOK_AHEAD_NON_WORD = '(?=.*\\W)'
export const DOES_NOT_CONTAIN_SPACE = '(?!.* )';

export const PASSWORD_VALIDATOR = new RegExp(`${LOOK_AHEAD_LOWERCASE}${LOOK_AHEAD_UPPERCASE}${LOOK_AHEAD_DIGITS}${LOOK_AHEAD_NON_WORD}${DOES_NOT_CONTAIN_SPACE}.{8,}`);
