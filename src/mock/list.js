export default [
  {
    url: '/api/sumile-companies/page',
    method: 'post',
    response: ({ query }) => {
      return {

        code: 200,
        data: {
          current: 1,
          pages: 21,
          size: 20,
          total: 413,
          'records|1-20': [{
            company: '@ctitle',
            address: '@county(true)',
            content: '@csentence',
            date: '@date("yyyy-MM-dd")',
            'status|0-2': 0,
            'process|0-100': 100
          }]
        },
        msg: '操作成功',
        success: true

      }
    }
  }
]
