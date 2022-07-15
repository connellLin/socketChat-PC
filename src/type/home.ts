interface IData {
  form: {
    email: string;
    password: string;
  },
  registerForm: {
    name: string,
    email: string;
    password: string;
    surePassword: string;
  },
  isLogin: number,
  timestamp: number,
  showModal: boolean,
  step: number,
  verificationCode: string,
  sendVerificationCodeState: boolean,
  hasSendVerificationCode: boolean,
  countdown: number,
  timer: any,
  showPopover: boolean,
}

export type {
  IData
}