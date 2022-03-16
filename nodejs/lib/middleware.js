const http = require('http')
const slice = Array.prototype.slice

class Middleware {
    constructor() {
        //儲存中間件
        this.routes = {
            all: [],
            get: [],
            post: [],
            put: [],
            patch: [],
            delete: []
        }
    }

    register(path) {
        const info = {}
        if(typeof path === 'string') {
            info.path = path
            //從第二個參數轉換成陣列
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            //從第一個參數轉換成陣列
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    put() {
        const info = this.register.apply(this, arguments)
        this.routes.put.push(info)
    }

    patch() {
        const info = this.register.apply(this, arguments)
        this.rutes.patch.push(info)
    }

    delete() {
        const info = this.register.apply(this, arguments)
        this.routes.delete.push(info)
    }

    match(method, url) {
        let stack = []
        if(url === '/favicon.ico') {
            return stack
        }

        //獲取路由
        let currRoutes = []
        currRoutes = currRoutes.concat(this.routes.all)
        currRoutes = currRoutes.concat(this.routes[method])

        currRoutes.forEach(routeInfo => {
            if(url.indexOf(routeInfo.path) === 0) {
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack
    }

    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
                const url = req.url
                const method = req.method.toLowerCase()

                const resultList = this.match(method, url)
            }
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = () => {
    return new Middleware()
}