// import queryString from 'query-string'
import _ from 'lodash'
import Mock from 'mockjs'
import config from './config'

export default request = {
    get(url, params) {
        let theUrl = config.baseUrl + url
        if(typeof params === 'object') {
            // url += '?' + queryString.stringify(params)
            const keyArr = Object.keys(params)
            let queryString = ''
            let queryCount = 0
            keyArr.forEach((v) => {
                // console.error(v, params[v])
                // 如果是最后一个查询字符, 则后面不加&符号
                if(queryCount < keyArr.length-1) {
                    queryString += `${v}=${params[v]}&`
                } else {
                    queryString += `${v}=${params[v]}`
                }
                queryCount++
            })
            theUrl = theUrl + '?' + queryString
            // console.error(queryCount, queryString, theUrl)
        } else {
            return false
        }

        return fetch(theUrl)
            .then((response) => {
                // console.error(JSON.stringify(response))
                // console.error(JSON.stringify(response), response._bodyInit)
                // return JSON.parse(response._bodyInit)
                return response.json()
            })
            .then((response) => {
                // console.error(JSON.stringify(response))
                // console.error(response)
                return Mock.mock(response)
            })
            .catch((error) => {
                // console.error(error)
            })
    },
    post(url, body) {
        // 使用lodash对内容进行扩展
        const options = _.extend(config.header, {
            body: JSON.stringify(body)
        })

        return fetch(url, options)
            .then((response) => {
                return JSON.parse(esponse._bodyInit)
            })
            .then((response) => {
                return Mock.mock(response)
            })
    }
}