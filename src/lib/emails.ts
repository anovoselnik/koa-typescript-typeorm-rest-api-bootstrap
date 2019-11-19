import { User } from '../entity/user';

const urlBase = process.env.FRONTEND_URL || 'http://localhost:3001';

const Emails = {
  sendWelcomeEmail: async (user: User) => {
    const data = {
      confirmUrl: `${urlBase}/confirm-email?token=${user.confirmationToken}`,
    };
    // IMPLEMENT REAL EMAIL SENDING HERE
    await Promise.resolve();
  },
};

export default Emails;
