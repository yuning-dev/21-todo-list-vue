import axios from 'axios'

export const signup = async item => {
    let data = {
        username: item.username,
        email: item.email,
        password: item.password,
        roles: ['user']
    }
    let request = {
        url: 'http://localhost:3000/api/auth/signup',
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
    }

    const response = await axios(request)
    return response
}

export const login = async item => {
    let data = {
        username: item.username,
        password: item.password,
    }
    let request = {
        url: 'http://localhost:3000/api/auth/login',
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        data: JSON.stringify(data)
    }

    const response = await axios(request)
    return response
}