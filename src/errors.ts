import { createError } from 'apollo-errors';

export const MissingDataError = createError('MissingDataError', {
    message: 'Not all required fields are filled in. Не заповненні данні'
});

export const InvalidEmailError = createError('InvalidEmailError', {
    message: 'Given email is invalid. Данна електронна пошта невірна'
});

export const ResetTokenExpiredError = createError('ResetTokenExpiredError', {
    message: 'resetToken expired.'
});

export const PasswordTooShortError = createError('PasswordTooShortError', {
    message: 'Password is too short.'
});

export const UserNotFoundError = createError('UserNotFoundError', {
    message: 'No user found. Користувача не знайдено'
});

export const InvalidInviteTokenError = createError('InvalidInviteTokenError', {
    message: 'inviteToken is invalid.'
});

export const InvalidEmailConfirmToken = createError(
    'InvalidEmailConfirmToken',
    {
        message: 'emailConfirmToken is invalid.'
    }
);

export const UserEmailExistsError = createError('UserEmailExistsError', {
    message: 'User already exists with this email.'
});

export const UserInviteNotAcceptedError = createError(
    'UserInviteNotAcceptedError',
    {
        message: 'User has not accepted invite yet.'

    }
);

export const UserDeletedError = createError('UserDeletedError', {
    message: 'User has been deleted.'
});

export const UserEmailUnconfirmedError = createError(
    'UserEmailUnconfirmedError',
    {
        message: 'Users email has not been confirmed yet. Електронна пошта не підтверджена'
    }
);

export const InvalidOldPasswordError = createError('InvalidOldPasswordError', {
    message: 'Invalid old password.'
});
