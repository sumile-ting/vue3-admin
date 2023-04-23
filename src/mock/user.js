export default [
  {
    url: '/api/sumile-auth/oauth/user-info',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        data: {
          realName: '@cname',
          name: '@name',
          id: '@id',
          avatar: '@image',
          phone: '@phone',
          email: '@email'
        }
      }
    }
  },
  {
    url: '/api/sumile-auth/oauth/token',
    method: 'post',
    response: ({ query }) => {
      return {

        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6IuiDnOW4rueuoeeQhuWRmCIsImF2YXRhciI6IiIsImF1dGhvcml0aWVzIjpbImFkbWluaXN0cmF0b3IiXSwiY2xpZW50X2lkIjoic2FiZXIiLCJmaXJzdF9sb2dpbiI6MSwicm9sZV9uYW1lIjoiYWRtaW5pc3RyYXRvciIsImxpY2Vuc2UiOiJwb3dlcmVkIGJ5IFNQQU5HIiwicG9zdF9pZCI6IjE0NzYxNzI3ODA2MzA3OTAxNDYiLCJ1c2VyX2lkIjoiMTUxODUxNjYwMTQzMTM3MTc3NyIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwic2NvcGUiOlsiYWxsIl0sIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsIm9hdXRoX2lkIjoiIiwiZXhwIjoxNjc0MDk4NDU2LCJkZXB0X2lkIjoiMTQ3NDIwMTI1NDE1NzY1MTk2OSIsImp0aSI6ImY3ZTU3Yzk0LTA0YjAtNGM5YS05MjYwLTk2MWM5MGRlZjg0ZiIsImFjY291bnQiOiJhZG1pbiJ9.IsAm7afALPPreWspnys_mRTGvpvPwQ_PLcizxzErXL4',
        token_type: 'bearer',
        refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInJlYWxfbmFtZSI6IuiDnOW4rueuoeeQhuWRmCIsImF2YXRhciI6IiIsImF1dGhvcml0aWVzIjpbImFkbWluaXN0cmF0b3IiXSwiY2xpZW50X2lkIjoic2FiZXIiLCJmaXJzdF9sb2dpbiI6MSwicm9sZV9uYW1lIjoiYWRtaW5pc3RyYXRvciIsImxpY2Vuc2UiOiJwb3dlcmVkIGJ5IFNQQU5HIiwicG9zdF9pZCI6IjE0NzYxNzI3ODA2MzA3OTAxNDYiLCJ1c2VyX2lkIjoiMTUxODUxNjYwMTQzMTM3MTc3NyIsInJvbGVfaWQiOiIxMTIzNTk4ODE2NzM4Njc1MjAxIiwic2NvcGUiOlsiYWxsIl0sIm5pY2tfbmFtZSI6IueuoeeQhuWRmCIsImF0aSI6ImY3ZTU3Yzk0LTA0YjAtNGM5YS05MjYwLTk2MWM5MGRlZjg0ZiIsIm9hdXRoX2lkIjoiIiwiZXhwIjoxNjc0MzU3NjU2LCJkZXB0X2lkIjoiMTQ3NDIwMTI1NDE1NzY1MTk2OSIsImp0aSI6IjFiYWNhNWVhLTA0MTctNGMwMi1hYTIzLTQ0ZWQ4YzYzZGYwNyIsImFjY291bnQiOiJhZG1pbiJ9.rzXuaj3qaMspkhfHgpzVi_wRlRTMu14HhgiDKejlQSY',
        expires_in: 259199,
        scope: 'all',
        tenant_id: '000000',
        user_name: '@ame',
        real_name: '@name',
        avatar: '',
        client_id: 'saber',
        first_login: 1,
        role_name: '@name',
        license: 'powered by sumile',
        post_id: '@id',
        user_id: '@id',
        role_id: '@id',
        nick_name: '@name',
        oauth_id: '',
        dept_id: '@id',
        account: '@name',
        jti: 'f7e57c94-04b0-4c9a-9260-961c90def84f'

      }
    }
  },
  {
    url: '/api/sumile-auth/oauth/logout',
    method: 'get',
    response: ({ query }) => {
      return {
        msg: 'success',
        success: 'true'
      }
    }
  }
]
