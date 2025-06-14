import { useState } from 'react'

// http://127.0.0.1:3000

function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(import.meta.env.TEST)

    async function sendData() {
        try {
            const result = await fetch(
                `${import.meta.env.BASIC_URL}/api/v1/auth/login`,
                {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                }
            )
            console.log(import.meta.env.BASIC_URL)
            console.log(result)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <input
                type="email"
                placehoder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placehoder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => sendData()}>SEND</button>
            <button onClick={() => console.log(import.meta.env.TEST)}>
                print
            </button>
        </div>
    )
}

export default App
