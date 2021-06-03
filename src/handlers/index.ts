import login from './scheduleLogin';
import logout from './scheduleLogout';
import authGoogle from './authGoogle';
import getInterrupts from './getInterrupts';
import postPushInterrupt from './postPushInterrupt';
import cancelInterrupt from './cancelInterrupt';
import getSchedules from './getSchedules';
import me from './me';

export default {
  me,
  login,
  logout,
  getInterrupts,
  postPushInterrupt,
  cancelInterrupt,
  authGoogle,
  getSchedules
};
