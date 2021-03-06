import type { IData } from "@/type/home";
class InitData implements IData {
  form: { email: string; password: string; } = { email: "", password: "" };
  registerForm: { name: string; email: string; password: string; surePassword: string; } = {
    name: "",
    email: "",
    password: "",
    surePassword: "",
  };
  isLogin: number = 1;
  timestamp: number = +new Date();
  showModal: boolean = false;
  step: number = 1;
  verificationCode: string = "";
  sendVerificationCodeState: boolean = false;
  hasSendVerificationCode: boolean = false;
  countdown: number = 60;
  timer: any = null;
  showPopover: boolean = false;
}

export { InitData }