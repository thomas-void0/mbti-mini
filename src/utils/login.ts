import { login, request } from "@tarojs/taro";

const SEND_CODE_TO_SERVER_URL =  "https://your-server.com/api/login"

export default async function userLogin(): Promise<{
  success: boolean;
  message?: string;
  data?: any;
}> {
  const getCode = (): Promise<{
    code: string;
    success: boolean;
    message?: string;
  }> => {
    return new Promise((resolve) => {
      login({
        success: function (res) {
          res.code
            ? resolve({
                code: res.code,
                success: true,
              })
            : resolve({
                code: "",
                success: false,
                message: res.errMsg,
              });
        },
        fail(res) {
          resolve({
            code: "",
            success: false,
            message: res.errMsg,
          });
        },
      });
    });
  };

  const sendCode = (
    code: string
  ): Promise<{
    success: boolean;
    data: any;
    message?: string;
  }> => {
    return new Promise((resolve) => {
      request({
        url: SEND_CODE_TO_SERVER_URL,
        method: "POST",
        data: {
          code: code,
        },
        success: function (response) {
          response.statusCode === 200
            ? resolve({
                success: true,
                data: response.data,
              })
            : resolve({
                success: false,
                data: null,
                message: response.errMsg,
              });
        },
        fail: function (error) {
          resolve({
            success: false,
            data: null,
            message: error.errMsg,
          });
        },
      });
    });
  };

  const getCodeRes = await getCode();
  if (getCodeRes.success && getCodeRes.code) {
    const sendCodeRes = await sendCode(getCodeRes.code);
    return sendCodeRes.success && sendCodeRes.data
      ? {
          success: true,
          data: sendCodeRes.data,
        }
      : {
          success: false,
          message: sendCodeRes.message,
        };
  }
  return {
    success: false,
    message: getCodeRes.message,
  };
}
