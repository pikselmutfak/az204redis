const redis = require('redis')
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const testRedis = async () => {

    const connection = redis.createClient(
        6380,
        'pixredis.redis.cache.windows.net',
        {
            auth_pass: 'ozAHQewZUOeH4LDzyDtXeIyqS52LdzicphUkaQmBIH4=',
            tls: {
                serverName: 'pixredis.redis.cache.windows.net'
            }
        }
    )

    const time = new Date().getTime()
    const key = "time"

    console.log("current time", time)

    console.log("cached time", await connection.getAsync(key))

    console.log("cached time set", await connection.setAsync(key, time))

    console.log("get cached time", await connection.getAsync(key))
}

testRedis()