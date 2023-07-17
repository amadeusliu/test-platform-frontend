interface UserInfo{
    id?: number,
    loginName?: string,
    userName?: string,
    nickname?: string,
    password?: string,
    gender?: string,
    email?: string,
    mobileNumber?: string,
    delFlag?: number,
    remark?: string
  
  }
  interface TokenData{
    token: string,
    Authentication: string,
  }

  interface UserDetail{
    username: string,
    password: string,
  }

  export {
    UserInfo, TokenData, UserDetail
  }