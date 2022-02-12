import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.containers.Auth.SignIn';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Sign In to Scientific Article Summary System',
  },
  loginWithGoogle: {
    id: `${scope}.loginWithGoogle`,
    defaultMessage: 'Continue with Google',
  },
  loginWithFacebook: {
    id: `${scope}.loginWithFacebook`,
    defaultMessage: 'Continue with Facebook',
  },
});
